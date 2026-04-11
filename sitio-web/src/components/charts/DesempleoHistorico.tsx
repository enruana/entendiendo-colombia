import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import ChartFrame from "./ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "./shared";

interface Row {
  fecha: string;
  TD: number;
}

export default function DesempleoHistorico() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/geih_total_nacional_mensual_2001_2026.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            fecha: v[0],
            TD: Number(v[4]) || 0,
          };
        });
        setData(rows);
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

  const tickYears = ["2001-01", "2005-01", "2009-01", "2013-01", "2017-01", "2020-01", "2022-01", "2024-01", "2026-01"];

  // Find max (COVID peak)
  const maxRow = data.reduce((m, r) => (r.TD > m.TD ? r : m), data[0]);

  return (
    <ChartFrame
      number="Grafica 1"
      title="Tasa de desempleo mensual (2001-2026)"
      description="25 años de desempleo en Colombia. El pico de COVID fue casi el doble del minimo historico."
      source="DANE — GEIH, serie mensual"
    >
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="tdGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.rose} stopOpacity={0.4} />
              <stop offset="95%" stopColor={COLORS.rose} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="fecha"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            ticks={tickYears}
            tickFormatter={(v) => v.split("-")[0]}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 25]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number) => [`${v.toFixed(1)}%`, "Desempleo"]}
          />
          <ReferenceArea
            x1="2020-03"
            x2="2021-06"
            fill={COLORS.rose}
            fillOpacity={0.1}
            label={{ value: "COVID-19", position: "insideTop", fill: COLORS.rose, fontSize: 11, fontWeight: 600 }}
          />
          <ReferenceLine
            y={8.9}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "Minimo 2025 (8.9%)",
              position: "right",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 600,
            }}
          />
          <Area
            type="monotone"
            dataKey="TD"
            stroke={COLORS.rose}
            strokeWidth={2}
            fill="url(#tdGrad)"
          />
          <ReferenceDot
            x={maxRow.fecha}
            y={maxRow.TD}
            r={6}
            fill={COLORS.rose}
            stroke="white"
            strokeWidth={2}
            label={{
              value: `Pico: ${maxRow.TD.toFixed(1)}%`,
              position: "top",
              fill: COLORS.rose,
              fontSize: 11,
              fontWeight: 600,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
