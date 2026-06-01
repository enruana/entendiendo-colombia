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

const endMonthMap: Record<string, string> = {
  "Ene - mar": "mar",
  "Feb - abr": "abr",
  "Mar - may": "may",
  "Abr - jun": "jun",
  "May - jul": "jul",
  "Jun - ago": "ago",
  "Jul - sep": "sep",
  "Ago - oct": "oct",
  "Sep - nov": "nov",
  "Oct - dic": "dic",
};

function formatTrim(trim: string): string {
  if (trim.includes("Nov 25 - ene 26")) return "ene'26";
  if (trim.includes("Dic 25 - feb 26")) return "feb'26";
  if (trim.includes("Ene 26 - mar 26") || trim.includes("Ene - mar 26")) return "mar'26";
  const yearMatch = trim.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1].slice(2) : "??";
  for (const [k, v] of Object.entries(endMonthMap)) {
    if (trim.includes(k)) return `${v}'${year}`;
  }
  return trim;
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
          return {
            trimestre: formatTrim(v[0]),
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

  return (
    <ChartFrame
      number="Gráfica 1"
      title="Trabajadores formales vs informales en Colombia (2021-2026)"
      description="En el trimestre móvil nov 2025 - ene 2026, por cada trabajador formal hay aproximadamente 1.24 informales. La brecha se ha cerrado lentamente: era 1.54 en el primer trimestre de 2021."
      source="DANE — GEIH Ocupación Informal, trimestre móvil · 60 trimestres"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Formales (10.7M)" />
          <LegendItem color={COLORS.rose} label="Informales (13.3M)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="fFormal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.emerald} stopOpacity={0.5} />
              <stop offset="95%" stopColor={COLORS.emerald} stopOpacity={0.08} />
            </linearGradient>
            <linearGradient id="fInformal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS.rose} stopOpacity={0.35} />
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
            angle={-35}
            textAnchor="end"
            height={55}
            interval={5}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => formatNumber(v * 1000)}
            domain={[6000, 14000]}
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
            stroke={COLORS.rose}
            strokeWidth={2.5}
            fill="url(#fInformal)"
          />
          <Area
            type="monotone"
            dataKey="formales"
            stroke={COLORS.emerald}
            strokeWidth={2.5}
            fill="url(#fFormal)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
