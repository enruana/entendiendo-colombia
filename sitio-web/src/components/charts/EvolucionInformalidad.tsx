import { useEffect, useState } from "react";
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "./ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "./shared";

interface Row {
  fecha: string;
  label: string;
  ocupados: number;
  informales: number;
  pctInf: number;
}

const endMonthMap: Record<string, [string, string]> = {
  "Ene - mar": ["03", "mar"],
  "Feb - abr": ["04", "abr"],
  "Mar - may": ["05", "may"],
  "Abr - jun": ["06", "jun"],
  "May - jul": ["07", "jul"],
  "Jun - ago": ["08", "ago"],
  "Jul - sep": ["09", "sep"],
  "Ago - oct": ["10", "oct"],
  "Sep - nov": ["11", "nov"],
  "Oct - dic": ["12", "dic"],
};

function parseTrim(trim: string): { fecha: string; label: string } {
  if (trim.includes("Nov 25 - ene 26")) return { fecha: "2026-01", label: "ene'26" };
  if (trim.includes("Dic 25 - feb 26")) return { fecha: "2026-02", label: "feb'26" };
  if (trim.includes("Ene 26 - mar 26") || trim.includes("Ene - mar 26"))
    return { fecha: "2026-03", label: "mar'26" };
  const yearMatch = trim.match(/(\d{4})/);
  const year = yearMatch ? yearMatch[1] : "0000";
  const ys = year.slice(2);
  for (const [k, [num, abbr]] of Object.entries(endMonthMap)) {
    if (trim.includes(k)) return { fecha: `${year}-${num}`, label: `${abbr}'${ys}` };
  }
  return { fecha: trim, label: trim };
}

// Promedios anuales pre-calculados de la serie 2021-2025 (5 anos completos).
// Se computan promediando las % de los 12 trimestres moviles cuyo trimestre
// termina en cada ano calendario.
const annualMeans = [
  { year: "2021", pct: 59.24 },
  { year: "2022", pct: 57.97 },
  { year: "2023", pct: 56.22 },
  { year: "2024", pct: 55.95 },
  { year: "2025", pct: 55.66 },
];

export default function EvolucionInformalidad() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/informalidad_por_sexo_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          const occ = Number(v[1]) || 0;
          const inf = Number(v[3]) || 0;
          const meta = parseTrim(v[0]);
          return {
            fecha: meta.fecha,
            label: meta.label,
            ocupados: Math.round(occ),
            informales: Math.round(inf),
            pctInf: occ > 0 ? (inf / occ) * 100 : 0,
          };
        });
        setData(rows.sort((a, b) => (a.fecha < b.fecha ? -1 : 1)));
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 1 · Evolución"
      title="Informalidad en Colombia: 5 años de descenso, cada vez más lento"
      description="Tasa de informalidad nacional (% de los ocupados que no cotizan seguridad social) por trimestre móvil. Bajó del 60,7% en ene-2021 al 55,3% en ene-2026. La caída anual fue rápida en 2022-2023 (postpandemia) y desde 2024 prácticamente se estancó."
      source="DANE — GEIH Ocupación Informal, serie trimestre móvil ene'21–ene'26 (59 trimestres)"
      legend={
        <>
          <LegendItem color={COLORS.rose} label="% informales (trimestre móvil)" shape="line" />
          <LegendItem color={COLORS.slate} label="Informales (miles)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={data} margin={{ top: 15, right: 15, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="label"
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
            yAxisId="left"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[54, 62]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}M`}
            domain={[11000, 14000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              if (name === "pctInf") return [`${value.toFixed(2)}%`, "% informales"];
              if (name === "informales")
                return [`${Math.round(value).toLocaleString("es-CO")} mil`, "Informales"];
              return [value, name];
            }}
          />
          <Bar
            yAxisId="right"
            dataKey="informales"
            fill={COLORS.slate}
            fillOpacity={0.15}
            stroke={COLORS.slate}
            strokeOpacity={0.3}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pctInf"
            stroke={COLORS.rose}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
          {annualMeans.map((m, i) => (
            <ReferenceLine
              key={m.year}
              yAxisId="left"
              y={m.pct}
              stroke={COLORS.rose}
              strokeDasharray="2 4"
              strokeOpacity={0.4}
              label={
                i === 0 || i === annualMeans.length - 1
                  ? {
                      value: `${m.year}: ${m.pct.toFixed(1)}%`,
                      position: "right",
                      fill: COLORS.rose,
                      fontSize: 10,
                      fontWeight: 600,
                    }
                  : undefined
              }
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>El descenso de la informalidad se está frenando.</strong> Entre 2021 y
        2023 la tasa cayó 3 puntos porcentuales (de 59,2% a 56,2%). Pero desde 2024 el
        ritmo se desplomó: el cambio anual fue de apenas −0,27 pp en 2024 y −0,29 pp
        en 2025. Y mientras la <em>tasa</em> baja, el <em>número absoluto</em> de
        informales subió de 12,15 millones promedio en 2021 a 13,27 millones en 2025
        (+1,12 millones): la ocupación total creció más rápido que el empleo informal,
        pero éste sigue creciendo en términos absolutos.
      </div>
    </ChartFrame>
  );
}
