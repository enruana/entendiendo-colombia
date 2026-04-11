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
  fecha: string;
  Oficios_del_hogar: number;
  Estudiando: number;
  Otros: number;
}

export default function PEIEvolucion() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/pei_desagregada_nacional_2010_2026.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          // Columnas: fecha, PEI_total, Estudiando, Oficios_del_hogar, Otros
          return {
            fecha: v[0],
            Estudiando: Number(v[2]) || 0,
            Oficios_del_hogar: Number(v[3]) || 0,
            Otros: Number(v[4]) || 0,
          };
        });
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando PEI...</div>
      </div>
    );
  }

  const tickYears = ["2010-01", "2013-01", "2016-01", "2019-01", "2021-01", "2023-01", "2025-01", "2026-01"];

  return (
    <ChartFrame
      number="Grafica 1"
      title="Composicion de la Poblacion Inactiva (2010-2026)"
      description="14.9 millones de personas que no trabajan ni buscan trabajo. La mayoria: mujeres en oficios del hogar (55.7%)."
      source="DANE — GEIH, serie mensual"
      legend={
        <>
          <LegendItem color={COLORS.pink} label="Oficios del hogar" />
          <LegendItem color={COLORS.cyan} label="Estudiando" />
          <LegendItem color={COLORS.violet} label="Otros (pensionados, desalentados, etc)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="gHogar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.pink} stopOpacity={0.5} />
              <stop offset="95%" stopColor={COLORS.pink} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="gEstudio" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.cyan} stopOpacity={0.5} />
              <stop offset="95%" stopColor={COLORS.cyan} stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="gOtros" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.violet} stopOpacity={0.5} />
              <stop offset="95%" stopColor={COLORS.violet} stopOpacity={0.1} />
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
            tickFormatter={(v) => formatNumber(v * 1000)}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                Oficios_del_hogar: "Oficios del hogar",
                Estudiando: "Estudiando",
                Otros: "Otros",
              };
              return [`${Math.round(v).toLocaleString("es-CO")} mil`, labels[name]];
            }}
          />
          <Area
            type="monotone"
            dataKey="Oficios_del_hogar"
            stackId="1"
            stroke={COLORS.pink}
            strokeWidth={2}
            fill="url(#gHogar)"
          />
          <Area
            type="monotone"
            dataKey="Estudiando"
            stackId="1"
            stroke={COLORS.cyan}
            strokeWidth={2}
            fill="url(#gEstudio)"
          />
          <Area
            type="monotone"
            dataKey="Otros"
            stackId="1"
            stroke={COLORS.violet}
            strokeWidth={2}
            fill="url(#gOtros)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
