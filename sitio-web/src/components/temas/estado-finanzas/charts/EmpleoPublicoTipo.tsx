import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Cifras DAFP 2024: orden nacional 1.04M (con 74.149 contratistas),
// territorial 354.823 (con 169.278 contratistas).
// Planta nacional = 1.040.000 - 74.149 = 965.851
// Planta territorial = 354.823 - 169.278 = 185.545
const data = [
  { tipo: "Planta orden nacional", servidores: 965851, contratistas: 0 },
  { tipo: "Contratistas orden nacional", servidores: 0, contratistas: 74149 },
  { tipo: "Planta orden territorial", servidores: 185545, contratistas: 0 },
  { tipo: "Contratistas orden territorial", servidores: 0, contratistas: 169278 },
];

const TOTAL = data.reduce((s, d) => s + d.servidores + d.contratistas, 0);

export default function EmpleoPublicoTipo() {
  return (
    <ChartFrame
      number="Gráfica 1 · Servidores"
      title="Quiénes trabajan para el Estado colombiano"
      description={`Casi 1,4 millones de personas tienen vínculo con el Estado colombiano en 2024. Tres de cada cuatro están en el orden nacional. Pero hay una distinción importante: los de "planta" tienen vínculo legal y prestacional con el Estado; los "contratistas" no — son personas naturales con contrato de prestación de servicios. En el orden territorial, casi la mitad son contratistas.`}
      source="DAFP — Departamento Administrativo de la Función Pública, cifras 2024"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Planta (vínculo legal)" />
          <LegendItem color={COLORS.amber} label="Contratistas (prestación de servicios)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="tipo"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-20}
            textAnchor="end"
            height={70}
            interval={0}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [
              `${Math.round(value).toLocaleString("es-CO")} personas`,
              "",
            ]}
          />
          <Bar dataKey="servidores" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={COLORS.emerald} />
            ))}
            <LabelList
              dataKey="servidores"
              position="top"
              formatter={(v: number) =>
                v > 0 ? `${(v / 1000).toFixed(0)}K` : ""
              }
              style={{ fontSize: 11, fontWeight: 700, fill: "#065f46" }}
            />
          </Bar>
          <Bar dataKey="contratistas" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={COLORS.amber} />
            ))}
            <LabelList
              dataKey="contratistas"
              position="top"
              formatter={(v: number) =>
                v > 0 ? `${(v / 1000).toFixed(0)}K` : ""
              }
              style={{ fontSize: 11, fontWeight: 700, fill: "#92400e" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>Total servidores del Estado en 2024: ~{(TOTAL / 1_000_000).toFixed(2)} millones.</strong>{" "}
        El orden nacional concentra el 75% (con 7% de contratistas). El orden territorial, casi
        48% de quienes "trabajan para el Estado" lo hacen por contrato de prestación — esto
        importa: no tienen estabilidad ni prestaciones plenas, y no entran en las estadísticas
        de "empleados públicos" que algunos países usan para comparaciones internacionales.
      </div>
    </ChartFrame>
  );
}
