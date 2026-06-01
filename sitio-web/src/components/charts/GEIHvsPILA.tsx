import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import ChartFrame, { LegendItem } from "./ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle, formatNumber } from "./shared";

// PILA: cotizantes totales verificados oficialmente.
// Fuente: informes mensuales UGPP (descargados directamente del sitio oficial)
// y reportes secundarios para meses sin informe oficial disponible.
const pilaData: { fecha: string; cotizantes: number }[] = [
  { fecha: "2023-02", cotizantes: 12881 },
  { fecha: "2023-11", cotizantes: 13604 },
  { fecha: "2024-02", cotizantes: 12844 },
  { fecha: "2024-09", cotizantes: 13819 },
  { fecha: "2024-11", cotizantes: 13910 },  // UGPP (citado en informe Nov25)
  { fecha: "2024-12", cotizantes: 13115 },  // UGPP (citado en informe Dic25)
  { fecha: "2025-02", cotizantes: 12972 },
  { fecha: "2025-04", cotizantes: 13271 },
  { fecha: "2025-05", cotizantes: 13143 },  // UGPP informe Mayo25 oficial
  { fecha: "2025-07", cotizantes: 13591 },  // UGPP informe Julio25 oficial
  { fecha: "2025-08", cotizantes: 13774 },  // UGPP informe Agosto25 oficial
  { fecha: "2025-11", cotizantes: 14240 },  // UGPP informe Noviembre25 oficial
  { fecha: "2025-12", cotizantes: 13352 },  // UGPP informe Diciembre25 oficial
  { fecha: "2026-01", cotizantes: 13039 },  // UGPP informe Enero26 oficial (13,039,466)
  { fecha: "2026-02", cotizantes: 13164 },  // UGPP informe Febrero26 oficial (13,163,895)
];

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
      number="Gráfica 2 · GEIH vs PILA"
      title="Dos fuentes oficiales, dos números diferentes"
      description="GEIH (DANE, autorreporte) ronda los 10.7M formales. PILA (UGPP, cotizaciones reales) alcanzó 14.24M cotizantes en noviembre 2025, descendió a 13.35M en diciembre y 13.04M en enero 2026, y se ubicó en 13.16M en febrero 2026 (-1,2% interanual). Las dos series miden conceptos distintos, por lo que se mueven en niveles diferentes."
      source="DANE GEIH (trimestre móvil nov'25-ene'26) + UGPP PILA (informes oficiales feb'23-feb'26)"
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
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>Lectura de las dos series.</strong> El máximo histórico de cotizantes
        PILA registrado en los informes UGPP es de <strong>14,239,988 en noviembre de
        2025</strong> (<a href="https://www.ugpp.gov.co/wp-content/uploads/2026/03/Noviembre25.html" target="_blank" rel="noopener" className="underline">informe UGPP Nov-2025</a>).
        En los meses posteriores la serie registra: <strong>13.35M en dic-2025</strong>,
        <strong>13.04M en ene-2026</strong> y <strong>13.16M en feb-2026</strong>
        (<a href="https://www.ugpp.gov.co/wp-content/uploads/2026/04/Informe_UGPP_Enero_2026.html" target="_blank" rel="noopener" className="underline">Ene-2026</a>,
        <a href="https://www.ugpp.gov.co/wp-content/uploads/2026/04/Informe_UGPP_Febrero_2026.html" target="_blank" rel="noopener" className="underline">Feb-2026</a>).
        Febrero 2026 tiene una variación interanual de -1,2%, la primera negativa en la
        serie reciente. La caída de diciembre a febrero coincide con el cierre de
        contratos temporales de fin de año, patrón estacional habitual en PILA. La
        brecha de nivel entre GEIH y PILA refleja diferencias metodológicas:
        autorreporte muestral vs. registro administrativo, distinto tratamiento de
        independientes y conteo por persona (GEIH) vs. por planilla (PILA). El último
        informe UGPP disponible es febrero 2026; los datos DANE cierran en el trimestre
        móvil nov'25-ene'26.
      </div>
    </ChartFrame>
  );
}
