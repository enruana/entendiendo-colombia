import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartFrame, { LegendItem } from "./ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "./shared";

interface Row {
  trimestre: string;
  tasa_mujeres: number;
  tasa_hombres: number;
}

export default function BrechaGenero() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/informalidad_por_sexo_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          // Cols: trimestre_movil, Ocupados_TN, Formales_TN, Informales_TN, Hombres_total, Hombres_formales, Hombres_informales, Mujeres_total, Mujeres_formales, Mujeres_informales
          const h_total = Number(v[4]) || 0;
          const h_informales = Number(v[6]) || 0;
          const m_total = Number(v[7]) || 0;
          const m_informales = Number(v[9]) || 0;
          return {
            trimestre: v[0]
              .replace("2025 ", "'25 ")
              .replace("2024 ", "'24 ")
              .replace("2023 ", "'23 ")
              .replace("2022 ", "'22 ")
              .replace("2021 ", "'21 "),
            tasa_hombres: h_total > 0 ? (h_informales / h_total) * 100 : 0,
            tasa_mujeres: m_total > 0 ? (m_informales / m_total) * 100 : 0,
          };
        });
        // Keep every 3rd point for visibility
        setData(rows.filter((_, i) => i % 3 === 0 || i === rows.length - 1));
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

  return (
    <ChartFrame
      number="Grafica 1"
      title="Tasa de informalidad por sexo (2021-2025)"
      description="La informalidad afecta a ambos, pero con diferencias. Los hombres tienen mayor informalidad total nacional (por la alta presencia en agricultura y construccion)."
      source="DANE — GEIH Ocupacion Informal"
      legend={
        <>
          <LegendItem color={COLORS.cyan} label="Hombres" shape="line" />
          <LegendItem color={COLORS.pink} label="Mujeres" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="trimestre"
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
            tickFormatter={(v) => `${v}%`}
            domain={[45, 65]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                tasa_hombres: "Hombres",
                tasa_mujeres: "Mujeres",
              };
              return [`${v.toFixed(1)}%`, labels[name]];
            }}
          />
          <Line
            type="monotone"
            dataKey="tasa_hombres"
            stroke={COLORS.cyan}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.cyan }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="tasa_mujeres"
            stroke={COLORS.pink}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.pink }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
