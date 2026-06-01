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
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  fecha: string;
  TD: number;
  TGP: number;
}

export default function TrampaEstadistica() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empleo/geih_total_nacional_mensual_2001_2026.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            fecha: v[0],
            TGP: Number(v[2]) || 0,
            TD: Number(v[4]) || 0,
          };
        });
        // Only show last 5 years to make the divergence visible
        setData(rows.filter((r) => r.fecha >= "2021-01"));
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
      number="Grafica 2 · La trampa"
      title="Cuando el desempleo baja y la participacion tambien"
      description="Si la tasa de desempleo baja PORQUE la gente consigue empleo, la TGP se mantiene o sube. Si baja PORQUE la gente deja de buscar, la TGP tambien baja. Mira lo que pasa en los ultimos meses."
      source="DANE — GEIH, serie mensual 2021-2026"
      legend={
        <>
          <LegendItem color={COLORS.rose} label="TD (Desempleo)" shape="line" />
          <LegendItem color={COLORS.indigo} label="TGP (Participacion)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data} margin={{ top: 10, right: 40, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="fecha"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            interval={5}
            tickFormatter={(v) => {
              const [y, m] = v.split("-");
              return `${m}/${y.slice(2)}`;
            }}
          />
          <YAxis
            yAxisId="td"
            stroke={COLORS.rose}
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[5, 22]}
          />
          <YAxis
            yAxisId="tgp"
            orientation="right"
            stroke={COLORS.indigo}
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[55, 70]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                TD: "Desempleo",
                TGP: "Participacion",
              };
              return [`${v.toFixed(1)}%`, labels[name]];
            }}
          />
          <Line
            yAxisId="td"
            type="monotone"
            dataKey="TD"
            stroke={COLORS.rose}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            yAxisId="tgp"
            type="monotone"
            dataKey="TGP"
            stroke={COLORS.indigo}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="mt-3 text-xs text-neutral-500 italic">
        El eje izquierdo (rojo) muestra el desempleo. El eje derecho (azul) la participacion. Cuando las dos bajan juntas, parte del "progreso" es desaliento.
      </p>
    </ChartFrame>
  );
}
