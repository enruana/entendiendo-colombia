import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import ChartFrame, { LegendItem } from "./ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle, formatNumber } from "./shared";

// PILA: cotizantes totales verificados oficialmente. Fuentes:
// - Informes mensuales UGPP (descargados directamente del sitio oficial)
// - Reportes Infobae/El Colombiano del 31 de marzo 2026 (citas de Bruce Mac Master, ANDI)
// Cada punto incluye la fuente exacta entre parentesis
const pilaData: { fecha: string; cotizantes: number }[] = [
  { fecha: "2023-02", cotizantes: 12881 },  // Infobae/ANDI
  { fecha: "2023-11", cotizantes: 13604 },  // Infobae/ANDI
  { fecha: "2024-02", cotizantes: 12844 },  // Infobae/ANDI
  { fecha: "2024-09", cotizantes: 13819 },  // Infobae/ANDI
  { fecha: "2024-11", cotizantes: 13910 },  // UGPP (citado en informe Nov25)
  { fecha: "2024-12", cotizantes: 13115 },  // UGPP (citado en informe Dic25)
  { fecha: "2025-02", cotizantes: 12972 },  // Infobae/ANDI
  { fecha: "2025-04", cotizantes: 13271 },  // Infobae/ANDI
  { fecha: "2025-05", cotizantes: 13143 },  // UGPP informe Mayo25 oficial
  { fecha: "2025-07", cotizantes: 13591 },  // UGPP informe Julio25 oficial
  { fecha: "2025-08", cotizantes: 13774 },  // UGPP informe Agosto25 oficial
  { fecha: "2025-11", cotizantes: 14240 },  // UGPP informe Noviembre25 - PICO HISTORICO REAL
  { fecha: "2025-12", cotizantes: 13352 },  // UGPP informe Diciembre25 oficial
];

// Dato ANDI marzo 2026: ~11.3M privados formales (NO comparable directamente con los
// cotizantes totales arriba, porque excluye sector publico e independientes)
const andiClaim = {
  fecha: "2026-03",
  privadosFormales: 11300,
  label: "ANDI: 11.3M privados formales",
};

export default function GEIHvsPILA() {
  const [geihData, setGeihData] = useState<{ fecha: string; formalesGEIH: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/informalidad_por_sexo_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        // Cada trimestre se etiqueta con el ULTIMO mes del trimestre movil.
        // Por ejemplo "2026 Nov 25 - ene 26" → fecha "2026-01"
        const endMonthMap: Record<string, [string, string]> = {
          "Ene - mar": ["", "03"],
          "Feb - abr": ["", "04"],
          "Mar - may": ["", "05"],
          "Abr - jun": ["", "06"],
          "May - jul": ["", "07"],
          "Jun - ago": ["", "08"],
          "Jul - sep": ["", "09"],
          "Ago - oct": ["", "10"],
          "Sep - nov": ["", "11"],
          "Oct - dic": ["", "12"],
        };
        const rows = lines.slice(1).map((line) => {
          const v = line.split(",");
          const trim = v[0];
          const formal = Number(v[2]);

          let fecha = "";
          // Trimestres cruzando ano (formato "2026 Nov 25 - ene 26")
          if (trim.includes("Nov 25 - ene 26")) {
            fecha = "2026-01";
          } else if (trim.includes("Dic 25 - feb 26")) {
            fecha = "2026-02";
          } else if (trim.includes("Ene 26 - mar 26") || trim.includes("Ene - mar 26")) {
            fecha = "2026-03";
          } else {
            // Trimestres normales: extraer ano + ultimo mes
            const yearMatch = trim.match(/(\d{4})/);
            const year = yearMatch ? yearMatch[1] : "2025";
            for (const [k, [, endMonth]] of Object.entries(endMonthMap)) {
              if (trim.includes(k)) {
                fecha = `${year}-${endMonth}`;
                break;
              }
            }
          }
          return {
            fecha,
            formalesGEIH: Math.round(formal),
          };
        });
        const filtered = rows.filter(
          (r) => r.fecha && r.fecha >= "2023-01" && !isNaN(r.formalesGEIH)
        );
        setGeihData(filtered);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando...</div>
      </div>
    );
  }

  // Merge all data points
  const allDates = [
    ...new Set([
      ...geihData.map((d) => d.fecha),
      ...pilaData.map((d) => d.fecha),
      "2026-03", // para mostrar marca de controversia
    ]),
  ].sort();

  const merged = allDates.map((fecha) => {
    const g = geihData.find((d) => d.fecha === fecha);
    const p = pilaData.find((d) => d.fecha === fecha);
    return {
      fecha,
      formalesGEIH: g?.formalesGEIH,
      cotizantesPILA: p?.cotizantes,
    };
  });

  return (
    <ChartFrame
      number="Grafica 2 · La controversia"
      title="Dos fuentes oficiales, dos numeros diferentes"
      description="GEIH (DANE, autorreporte) marca ~10.7M formales. PILA (UGPP, cotizaciones reales) llego a su PICO HISTORICO en noviembre 2025 con 14.24M cotizantes, antes de caer fuerte en diciembre. La brecha de ~2.5M entre ambas fuentes no es un error: miden cosas distintas. La controversia DANE-ANDI estallo el 31 de marzo de 2026."
      source="DANE GEIH (extension feb 2026) + UGPP PILA (datos oficiales verificados)"
      legend={
        <>
          <LegendItem color={COLORS.indigo} label="GEIH: Formales (autorreporte)" shape="line" />
          <LegendItem color={COLORS.amber} label="PILA: Cotizantes (registro real)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={merged} margin={{ top: 15, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="fecha"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-35}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => formatNumber(v * 1000)}
            domain={[8500, 15000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                formalesGEIH: "GEIH: Formales",
                cotizantesPILA: "PILA: Cotizantes",
              };
              if (v === null || v === undefined) return ["-", labels[name]];
              return [`${Math.round(v).toLocaleString("es-CO")} mil`, labels[name] || name];
            }}
          />
          <Line
            type="monotone"
            dataKey="formalesGEIH"
            stroke={COLORS.indigo}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.indigo }}
            activeDot={{ r: 6 }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="cotizantesPILA"
            stroke={COLORS.amber}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.amber }}
            activeDot={{ r: 6 }}
            connectNulls
          />
          <ReferenceDot
            x="2025-11"
            y={14240}
            r={8}
            fill="none"
            stroke={COLORS.rose}
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{
              value: "Pico PILA: 14.24M",
              position: "top",
              fill: COLORS.rose,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x="2026-03"
            stroke={COLORS.rose}
            strokeDasharray="5 5"
            strokeWidth={2}
            label={{
              value: "Controversia 31/mar",
              position: "insideTopRight",
              fill: COLORS.rose,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900">
        <strong>El pico real fue noviembre 2025, no septiembre 2024:</strong> Cuando la
        ANDI denuncio en marzo 2026 que se habian "perdido 500 mil empleos formales",
        comparo el pico de 2024 con datos posteriores. Pero los informes mensuales
        oficiales de UGPP muestran que el verdadero pico historico fue
        <strong> noviembre 2025 con 14.24 millones</strong> de cotizantes. Despues de
        ese pico cayo fuerte (efecto estacional fuerte: muchos contratos temporales
        terminan en diciembre).
        <br /><br />
        <strong>Por que la grafica para en diciembre 2025:</strong> Los datos publicos
        del DANE sobre formales se publican <em>trimestre movil</em> con ~45 dias de
        rezago. El ultimo disponible al 11 de abril 2026 es <strong>noviembre 2025 -
        enero 2026</strong>. Para PILA, el ultimo informe publico de UGPP es Diciembre25.
        Los datos de enero, febrero y marzo 2026 se publicaran progresivamente entre
        marzo y mayo 2026.
        <br /><br />
        <strong>Sobre la cifra ANDI de "11.3 millones":</strong> Mac Master citó esa cifra
        para marzo 2026, pero se refiere <em>solo a trabajadores privados formales</em>
        (excluye sector público e independientes). No es directamente comparable con los
        ~13-14M de cotizantes totales que muestra la serie PILA. Esa diferencia conceptual
        es parte central del enredo: cada lado usa una rebanada distinta del mismo universo.
      </div>
    </ChartFrame>
  );
}
