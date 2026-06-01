import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  fecha: string;
  TGP: number;
  TO: number;
  TD: number;
}

export default function TasasHistorico() {
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
            TO: Number(v[3]) || 0,
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
        <div className="text-sm text-neutral-500">Cargando serie histórica...</div>
      </div>
    );
  }

  const tickYears = [
    "2001-01", "2005-01", "2009-01", "2013-01",
    "2017-01", "2020-01", "2022-01", "2024-01", "2026-01"
  ];

  return (
    <ChartFrame
      number="Gráfica 2"
      title="Tasa de participación, ocupación y desempleo (2001-2026)"
      description="25 años de historia del mercado laboral colombiano en una sola gráfica. El shock de COVID es visible en 2020-2021."
      source="DANE — GEIH, serie mensual 2001-2026"
      legend={
        <>
          <LegendItem color={COLORS.indigo} label="TGP (Participación)" shape="line" />
          <LegendItem color={COLORS.emerald} label="TO (Ocupación)" shape="line" />
          <LegendItem color={COLORS.rose} label="TD (Desempleo)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
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
            domain={[0, 80]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                TGP: "Participación",
                TO: "Ocupación",
                TD: "Desempleo",
              };
              return [`${v.toFixed(1)}%`, labels[name] || name];
            }}
          />
          <ReferenceArea
            x1="2020-03"
            x2="2021-06"
            fill={COLORS.rose}
            fillOpacity={0.08}
            label={{
              value: "COVID-19",
              position: "insideTop",
              fill: COLORS.rose,
              fontSize: 11,
              fontWeight: 600,
            }}
          />
          <ReferenceLine
            y={9}
            stroke={COLORS.slate}
            strokeDasharray="3 3"
            strokeWidth={1}
            label={{
              value: "9%",
              position: "right",
              fill: COLORS.slate,
              fontSize: 10,
            }}
          />
          <Line
            type="monotone"
            dataKey="TGP"
            stroke={COLORS.indigo}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="TO"
            stroke={COLORS.emerald}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="TD"
            stroke={COLORS.rose}
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
