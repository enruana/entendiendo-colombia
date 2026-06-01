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
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  fecha: string;
  label: string;
  ocupados: number;
  formales: number;
  pctForm: number;
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

// Promedios anuales calculados sobre los 12 trimestres moviles de cada ano.
const annualMeans = [
  { year: "2021", pct: 40.76 },
  { year: "2022", pct: 42.03 },
  { year: "2023", pct: 43.78 },
  { year: "2024", pct: 44.05 },
  { year: "2025", pct: 44.34 },
];

export default function EvolucionFormalidad() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empleo/informalidad_por_sexo_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          const occ = Number(v[1]) || 0;
          const form = Number(v[2]) || 0;
          const meta = parseTrim(v[0]);
          return {
            fecha: meta.fecha,
            label: meta.label,
            ocupados: Math.round(occ),
            formales: Math.round(form),
            pctForm: occ > 0 ? (form / occ) * 100 : 0,
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
      title="Formales en Colombia: 5 años de crecimiento, cada vez más lento"
      description="Tasa de formalidad nacional (% de ocupados que sí cotizan seguridad social) por trimestre móvil. Subió del 39,3% en ene-2021 al 44,7% en ene-2026. El avance fue rápido en 2022-2023 (postpandemia) y desde 2024 se redujo a una décima parte del ritmo previo."
      source="DANE — GEIH Ocupación Informal, serie trimestre móvil ene'21–ene'26 (59 trimestres)"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="% formales (trimestre móvil)" shape="line" />
          <LegendItem color={COLORS.slate} label="Formales (miles)" />
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
            domain={[38, 46]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}M`}
            domain={[7000, 11500]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              if (name === "pctForm") return [`${value.toFixed(2)}%`, "% formales"];
              if (name === "formales")
                return [`${Math.round(value).toLocaleString("es-CO")} mil`, "Formales"];
              return [value, name];
            }}
          />
          <Bar
            yAxisId="right"
            dataKey="formales"
            fill={COLORS.slate}
            fillOpacity={0.15}
            stroke={COLORS.slate}
            strokeOpacity={0.3}
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="pctForm"
            stroke={COLORS.emerald}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />
          {annualMeans.map((m, i) => (
            <ReferenceLine
              key={m.year}
              yAxisId="left"
              y={m.pct}
              stroke={COLORS.emerald}
              strokeDasharray="2 4"
              strokeOpacity={0.4}
              label={
                i === 0 || i === annualMeans.length - 1
                  ? {
                      value: `${m.year}: ${m.pct.toFixed(1)}%`,
                      position: "right",
                      fill: COLORS.emerald,
                      fontSize: 10,
                      fontWeight: 600,
                    }
                  : undefined
              }
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>El avance de la formalidad se ha frenado.</strong> Entre 2021 y 2023 la
        tasa subió 3 puntos porcentuales (de 40,8% a 43,8%). Pero desde 2024 el ritmo
        se desplomó: el cambio anual fue de apenas +0,27 pp en 2024 y +0,29 pp en 2025.
        En <em>absolutos</em> sí hay crecimiento sólido: los formales pasaron de 8,37
        millones promedio en 2021 a 10,58 millones en 2025 (<strong>+2,21 millones,
        +26,4%</strong>) — más rápido que el crecimiento de los informales (+9,2%), y
        eso es lo que hizo subir la tasa de formalidad.
      </div>
    </ChartFrame>
  );
}
