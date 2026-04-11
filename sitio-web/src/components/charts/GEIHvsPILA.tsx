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

// Datos PILA reales tomados del reporte C.2 (fuente UGPP)
const pilaData = [
  { fecha: "2023-02", cotizantes: 12881 },
  { fecha: "2023-06", cotizantes: 13200 },
  { fecha: "2023-11", cotizantes: 13604 },
  { fecha: "2024-02", cotizantes: 12844 },
  { fecha: "2024-06", cotizantes: 13400 },
  { fecha: "2024-09", cotizantes: 13819 },
  { fecha: "2024-12", cotizantes: 13110 },
  { fecha: "2025-02", cotizantes: 12972 },
  { fecha: "2025-04", cotizantes: 13271 },
  { fecha: "2025-05", cotizantes: 13143 },
  { fecha: "2025-09", cotizantes: 13400 },
  { fecha: "2025-12", cotizantes: 13352 },
];

export default function GEIHvsPILA() {
  const [geihData, setGeihData] = useState<{ fecha: string; formalesGEIH: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos de informalidad trimestral y calcular formales del GEIH
    fetch("/data/informalidad_por_sexo_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows = lines.slice(1).map((line) => {
          const v = line.split(",");
          const trim = v[0];
          const formal = Number(v[2]);
          // Convertir "2021 Ene - mar" a fecha estimada (mes del medio del trimestre)
          const yearMatch = trim.match(/(\d{4})/);
          const monthMap: Record<string, string> = {
            "Ene - mar": "02", "Feb - abr": "03", "Mar - may": "04",
            "Abr - jun": "05", "May - jul": "06", "Jun - ago": "07",
            "Jul - sep": "08", "Ago - oct": "09", "Sep - nov": "10",
            "Oct - dic": "11", "Nov - ene": "12", "Dic - feb": "01",
          };
          const year = yearMatch ? yearMatch[1] : "2025";
          let month = "06";
          for (const [k, v] of Object.entries(monthMap)) {
            if (trim.includes(k)) {
              month = v;
              break;
            }
          }
          return {
            fecha: `${year}-${month}`,
            formalesGEIH: Math.round(formal),
          };
        });
        setGeihData(rows.filter((r) => r.fecha >= "2023-01"));
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

  // Merge data
  const allDates = [
    ...new Set([...geihData.map((d) => d.fecha), ...pilaData.map((d) => d.fecha)]),
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
      description="La GEIH del DANE mide 'formales' preguntando a las personas. PILA mide cotizantes reales. Ambas son oficiales. Ambas dan numeros distintos."
      source="DANE GEIH + UGPP PILA — Datos 2023-2025"
      legend={
        <>
          <LegendItem color={COLORS.indigo} label="GEIH: Formales (autorreporte)" shape="line" />
          <LegendItem color={COLORS.amber} label="PILA: Cotizantes (registro real)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={merged} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="fecha"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-30}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => formatNumber(v * 1000)}
            domain={[9000, 15000]}
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
            x="2024-09"
            y={13819}
            r={8}
            fill="none"
            stroke={COLORS.rose}
            strokeWidth={2}
            strokeDasharray="3 3"
            label={{
              value: "Pico PILA",
              position: "top",
              fill: COLORS.rose,
              fontSize: 10,
              fontWeight: 600,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
