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

// Tasa de informalidad total nacional según GEIH-EISS
// Nota metodológica: la definición cambió en 2021 con la nueva metodología GEIH
// Los datos pre-2021 son estimados aproximados con metodología antigua
// Los datos 2021+ son con metodología actual GEIH-EISS
const data = [
  { anio: "2015", informalidad: 49.5, metodologia: "Antigua", gobierno: "Santos II" },
  { anio: "2016", informalidad: 48.9, metodologia: "Antigua", gobierno: "Santos II" },
  { anio: "2017", informalidad: 48.2, metodologia: "Antigua", gobierno: "Santos II" },
  { anio: "2018", informalidad: 48.0, metodologia: "Antigua", gobierno: "Santos II/Duque" },
  { anio: "2019", informalidad: 47.4, metodologia: "Antigua", gobierno: "Duque" },
  { anio: "2020", informalidad: 48.6, metodologia: "Antigua", gobierno: "Duque · Pandemia" },
  { anio: "2021", informalidad: 59.24, metodologia: "Nueva GEIH", gobierno: "Duque" },
  { anio: "2022", informalidad: 57.97, metodologia: "Nueva GEIH", gobierno: "Duque/Petro" },
  { anio: "2023", informalidad: 56.22, metodologia: "Nueva GEIH", gobierno: "Petro" },
  { anio: "2024", informalidad: 55.95, metodologia: "Nueva GEIH", gobierno: "Petro" },
  { anio: "2025", informalidad: 55.66, metodologia: "Nueva GEIH", gobierno: "Petro" },
];

export default function InformalidadHistoricoBP() {
  return (
    <ChartFrame
      number="Gráfica 3 · Informalidad"
      title="Tasa de informalidad laboral 2015-2025 (% de ocupados sin seguridad social)"
      description="Porcentaje de trabajadores ocupados que no cotizan a seguridad social — la definición central de informalidad según DANE, alineada con estándares OIT. La línea vertical marca 2021, cuando entró en vigor la nueva metodología GEIH y la definición se hizo más estricta. Las series antes y después de esa fecha no son directamente comparables. Bajo la nueva metodología, la informalidad cayó de 59,24% (2021) a 55,66% (2025): 3,58 pp de reducción en 4 años."
      source="DANE — GEIH y GEIH-EISS. Cambio metodológico en 2021 documentado por DANE."
      legend={
        <>
          <LegendItem color={COLORS.slate} label="Metodología antigua (2015-2020)" />
          <LegendItem color={COLORS.rose} label="Nueva metodología (2021+)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[40, 65]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value.toFixed(2)}%  ·  ${d.gobierno}  ·  ${d.metodologia}`,
                "Informalidad",
              ];
            }}
          />
          <ReferenceLine
            x="2021"
            stroke={COLORS.slate}
            strokeDasharray="6 3"
            strokeWidth={2}
            label={{
              value: "Nueva metodología",
              position: "insideTop",
              fill: COLORS.slate,
              fontSize: 11,
              fontWeight: 700,
            }}
          />
          <Bar
            dataKey="informalidad"
            fill={COLORS.rose}
            fillOpacity={0.15}
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="informalidad"
            stroke={COLORS.rose}
            strokeWidth={3}
            dot={(props) => {
              const d = data[props.index];
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={5}
                  fill={d.metodologia === "Nueva GEIH" ? COLORS.rose : COLORS.slate}
                  stroke="#fff"
                  strokeWidth={2}
                />
              );
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>La comparación 2022 → 2025 es válida (misma metodología).</strong>{" "}
        Bajo Petro, la informalidad pasó de 57,97% a 55,66% — <strong>caída de
        2,31 pp en 3 años</strong>. Es un avance real, aunque modesto. Compárese
        con Santos II, quien redujo la informalidad ~6 pp en 8 años bajo
        metodología antigua (más laxa). El ritmo no es excepcional, pero
        <strong>continuidad importa</strong>: si cada gobierno reduce 2-3 pp,
        en dos décadas Colombia podría tener informalidad OCDE (~15-20%).
      </div>
    </ChartFrame>
  );
}
