import { useEffect, useState } from "react";
import ChartFrame from "../../../charts/ChartFrame";

// Intensidad de presencia de grupos armados por departamento y año
// Escala 0-3: 0 = sin presencia, 1 = baja, 2 = media, 3 = alta
// Basado en: Defensoria del Pueblo (Alertas Tempranas), FIP, Indepaz e InSight Crime
// Nombres normalizados al campo "nombre" del GeoJSON
type Intensidad = 0 | 1 | 2 | 3;
type IntensidadPorDpto = Record<string, Intensidad>;

const I_2016: IntensidadPorDpto = {
  // Pre-Acuerdo: FARC en territorios historicos + ELN + paramilitares emergentes
  CAUCA: 3, NARINO: 3, CHOCO: 3, "NORTE DE SANTANDER": 3, ARAUCA: 3,
  CAQUETA: 3, PUTUMAYO: 3, META: 3, "ANTIOQUIA": 3,
  TOLIMA: 2, HUILA: 2, "VALLE DEL CAUCA": 2, GUAVIARE: 2, CASANARE: 2,
  GUAINIA: 2, VAUPES: 2, VICHADA: 2, "SANTAFE DE BOGOTA D.C": 0, "BOLIVAR": 2,
  CORDOBA: 2, SUCRE: 1, MAGDALENA: 1, "LA GUAJIRA": 1, CESAR: 2,
  CUNDINAMARCA: 1, BOYACA: 1, SANTANDER: 1, "SAN ANDRES Y PROVIDENCIA": 0,
  RISARALDA: 1, QUINDIO: 0, CALDAS: 1, "ATLANTICO": 0, AMAZONAS: 1,
};

const I_2019: IntensidadPorDpto = {
  // Post-Acuerdo: disidencias emergen en zonas FARC, AGC se consolida
  CAUCA: 3, NARINO: 3, CHOCO: 3, "NORTE DE SANTANDER": 3, ARAUCA: 3,
  ANTIOQUIA: 3, PUTUMAYO: 2, CAQUETA: 2, META: 2,
  "VALLE DEL CAUCA": 2, "BOLIVAR": 2, CORDOBA: 2, GUAVIARE: 2,
  TOLIMA: 1, HUILA: 1, CASANARE: 1, GUAINIA: 1, VAUPES: 1, VICHADA: 1,
  CESAR: 1, "LA GUAJIRA": 1, MAGDALENA: 1, SUCRE: 1,
  CUNDINAMARCA: 0, BOYACA: 0, SANTANDER: 1, "SAN ANDRES Y PROVIDENCIA": 0,
  RISARALDA: 0, QUINDIO: 0, CALDAS: 1, ATLANTICO: 0, AMAZONAS: 1,
  "SANTAFE DE BOGOTA D.C": 0,
};

const I_2022: IntensidadPorDpto = {
  // Cambio de gobierno, inicio Paz Total
  CAUCA: 3, NARINO: 3, CHOCO: 3, "NORTE DE SANTANDER": 3, ARAUCA: 3,
  ANTIOQUIA: 3, PUTUMAYO: 3, CAQUETA: 2, META: 2,
  "VALLE DEL CAUCA": 2, "BOLIVAR": 2, CORDOBA: 2, GUAVIARE: 2, CASANARE: 2,
  TOLIMA: 1, HUILA: 1, GUAINIA: 1, VAUPES: 1, VICHADA: 2,
  CESAR: 2, "LA GUAJIRA": 2, MAGDALENA: 1, SUCRE: 1,
  CUNDINAMARCA: 1, BOYACA: 0, SANTANDER: 1, "SAN ANDRES Y PROVIDENCIA": 0,
  RISARALDA: 1, QUINDIO: 0, CALDAS: 1, ATLANTICO: 0, AMAZONAS: 1,
  "SANTAFE DE BOGOTA D.C": 0,
};

const I_2025: IntensidadPorDpto = {
  // Maximo historico: 790 municipios afectados, 71% del pais
  CAUCA: 3, NARINO: 3, CHOCO: 3, "NORTE DE SANTANDER": 3, ARAUCA: 3,
  ANTIOQUIA: 3, PUTUMAYO: 3, CAQUETA: 3, META: 3,
  "VALLE DEL CAUCA": 3, "BOLIVAR": 3, CORDOBA: 3, GUAVIARE: 3, CASANARE: 2,
  TOLIMA: 2, HUILA: 2, GUAINIA: 2, VAUPES: 2, VICHADA: 2,
  CESAR: 2, "LA GUAJIRA": 2, MAGDALENA: 2, SUCRE: 2,
  CUNDINAMARCA: 1, BOYACA: 1, SANTANDER: 2, "SAN ANDRES Y PROVIDENCIA": 0,
  RISARALDA: 1, QUINDIO: 1, CALDAS: 1, ATLANTICO: 1, AMAZONAS: 1,
  "SANTAFE DE BOGOTA D.C": 0,
};

// Stats: numero de municipios afectados por anio (fuente Defensoria/FIP)
const STATS = {
  2016: { municipios: 280, deptos: 22, total_municipios: 1103 },
  2019: { municipios: 195, deptos: 18, total_municipios: 1103 },
  2022: { municipios: 400, deptos: 24, total_municipios: 1103 },
  2025: { municipios: 790, deptos: 32, total_municipios: 1103 },
};

const intensityColors = ["#f1f5f9", "#fda4af", "#f43f5e", "#9f1239"];

// Coordenadas de Colombia: lon -82 a -66, lat -5 a 13
// SVG viewBox 0 0 200 250 con proyeccion equirectangular
const LON_MIN = -82, LON_MAX = -66;
const LAT_MIN = -5, LAT_MAX = 13;
const W = 200, H = 250;
const projectXY = (lon: number, lat: number): [number, number] => [
  ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * W,
  ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H,
];

interface Feature {
  properties: { id: string; nombre: string };
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
}

function geometryToPath(geom: Feature["geometry"]): string {
  const polysToPath = (polys: number[][][]) =>
    polys
      .map((ring) =>
        ring
          .map((c, i) => {
            const [x, y] = projectXY(c[0], c[1]);
            return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
          })
          .join("") + "Z",
      )
      .join("");
  if (geom.type === "Polygon") {
    return polysToPath(geom.coordinates as number[][][]);
  }
  return (geom.coordinates as number[][][][]).map((p) => polysToPath(p)).join("");
}

function MapaSingle({
  features,
  intensidad,
  anio,
}: {
  features: Feature[];
  intensidad: IntensidadPorDpto;
  anio: number;
}) {
  const stats = STATS[anio as keyof typeof STATS];
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm font-bold text-neutral-900 mb-1">{anio}</div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto max-w-[180px]"
        style={{ background: "#fff" }}
      >
        {features.map((f) => {
          const nombre = f.properties.nombre;
          const i = intensidad[nombre] ?? 0;
          return (
            <path
              key={f.properties.id}
              d={geometryToPath(f.geometry)}
              fill={intensityColors[i]}
              stroke="#fff"
              strokeWidth={0.5}
            />
          );
        })}
      </svg>
      <div className="mt-2 text-center">
        <div className="text-xl font-extrabold text-rose-700 font-mono">
          {stats.municipios}
        </div>
        <div className="text-[10px] text-neutral-600">municipios</div>
        <div className="text-[10px] text-neutral-500">de {stats.total_municipios}</div>
      </div>
    </div>
  );
}

export default function MapaGeografiaTemporal() {
  const [features, setFeatures] = useState<Feature[] | null>(null);

  useEffect(() => {
    fetch("/data/conflicto-armado/colombia-dept-simple.geojson")
      .then((r) => r.json())
      .then((geo) => setFeatures(geo.features));
  }, []);

  if (!features) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando mapas...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 1 · Mapa temporal"
      title="Cómo se ha expandido la presencia armada por el territorio (2016-2025)"
      description="Mapas comparativos de Colombia con la intensidad de presencia de grupos armados ilegales por departamento. La caída entre 2016 y 2019 refleja la desmovilización FARC: zonas históricas como Caquetá, Putumayo y Meta dejaron de tener presencia armada con la salida del grupo. Pero a partir de 2019 la curva se invierte: las disidencias, el ELN y el Clan del Golfo se expanden a nuevos territorios. En 2025 ya son 790 municipios afectados — el 71% del país."
      source="Defensoría del Pueblo · Sistema de Alertas Tempranas · FIP · Indepaz · InSight Crime. Intensidad cualitativa estimada a nivel departamental."
    >
      <div className="flex justify-center gap-2 mb-4 flex-wrap text-xs">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: intensityColors[0] }}></span>
          Sin presencia
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: intensityColors[1] }}></span>
          Baja
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: intensityColors[2] }}></span>
          Media
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="inline-block w-3 h-3 rounded-sm" style={{ background: intensityColors[3] }}></span>
          Alta
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
        <MapaSingle features={features} intensidad={I_2016} anio={2016} />
        <MapaSingle features={features} intensidad={I_2019} anio={2019} />
        <MapaSingle features={features} intensidad={I_2022} anio={2022} />
        <MapaSingle features={features} intensidad={I_2025} anio={2025} />
      </div>

      <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>De 195 a 790 municipios afectados en seis años.</strong> El conteo
        de municipios con presencia de algún grupo armado pasó de 195 en 2019 (el
        punto bajo, justo después del Acuerdo) a 790 en 2025 — un crecimiento del
        <strong> +305%</strong>. Hoy 7 de cada 10 municipios colombianos tienen
        presencia, tránsito o riesgo de algún grupo. Las zonas que escapan al
        conflicto se redujeron: eje cafetero, sabana de Bogotá y algunos municipios
        de Boyacá, Santander y la costa Caribe son las excepciones.
      </div>
    </ChartFrame>
  );
}
