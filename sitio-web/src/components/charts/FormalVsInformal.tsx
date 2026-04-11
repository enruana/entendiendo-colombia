import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartFrame, { LegendItem } from "./ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle, formatNumber } from "./shared";

interface Row {
  trimestre: string;
  formales: number;
  informales: number;
}

export default function FormalVsInformal() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/informalidad_por_sexo_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          // Columnas: trimestre_movil, Ocupados_TN, Formales_TN, Informales_TN, ...
          return {
            trimestre: v[0].replace("2025 ", "").replace("2024 ", "'24 ").replace("2023 ", "'23 ").replace("2022 ", "'22 ").replace("2021 ", "'21 "),
            formales: Number(v[2]) || 0,
            informales: Number(v[3]) || 0,
          };
        });
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  // Show every 4th point for readability
  const displayData = data.filter((_, i) => i % 4 === 0 || i === data.length - 1);

  return (
    <ChartFrame
      number="Grafica 1"
      title="Trabajadores formales vs informales en Colombia (2021-2025)"
      description="En 2025, por cada trabajador formal hay aproximadamente 1.3 informales. La proporcion apenas ha cambiado en 5 anos."
      source="DANE — GEIH Ocupacion Informal, trimestre movil"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Formales (~10.8M)" />
          <LegendItem color={COLORS.rose} label="Informales (~13.4M)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={displayData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="fFormal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.4} />
              <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="fInformal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.rose} stopOpacity={0.4} />
              <stop offset="95%" stopColor={COLORS.rose} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="trimestre"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => formatNumber(v * 1000)}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                formales: "Formales",
                informales: "Informales",
              };
              return [`${Math.round(v).toLocaleString("es-CO")} mil`, labels[name] || name];
            }}
          />
          <Area
            type="monotone"
            dataKey="informales"
            stackId="1"
            stroke={COLORS.rose}
            strokeWidth={2}
            fill="url(#fInformal)"
          />
          <Area
            type="monotone"
            dataKey="formales"
            stackId="1"
            stroke={COLORS.emerald}
            strokeWidth={2}
            fill="url(#fFormal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
