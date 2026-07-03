import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Pobreza monetaria total y extrema en Colombia según DANE
// Nota: en 2019 hubo cambio metodológico (nuevo empalme)
const data = [
  { anio: "2014", total: 28.5, extrema: 8.1, gobierno: "Santos I" },
  { anio: "2015", total: 27.8, extrema: 7.9, gobierno: "Santos II" },
  { anio: "2016", total: 28.0, extrema: 8.5, gobierno: "Santos II" },
  { anio: "2017", total: 26.9, extrema: 7.4, gobierno: "Santos II" },
  { anio: "2018", total: 27.0, extrema: 7.2, gobierno: "Santos II/Duque" },
  { anio: "2019", total: 35.7, extrema: 9.6, gobierno: "Duque · Nueva metodología" },
  { anio: "2020", total: 42.5, extrema: 15.1, gobierno: "Duque · Pandemia" },
  { anio: "2021", total: 39.3, extrema: 12.2, gobierno: "Duque" },
  { anio: "2022", total: 36.6, extrema: 13.8, gobierno: "Duque/Petro" },
  { anio: "2023", total: 34.6, extrema: 11.5, gobierno: "Petro" },
  { anio: "2024", total: 31.8, extrema: 11.7, gobierno: "Petro" },
  { anio: "2025", total: 28.0, extrema: 9.6, gobierno: "Petro" },
];

export default function PobrezaMonetariaBP() {
  return (
    <ChartFrame
      number="Gráfica 1 · Pobreza monetaria"
      title="Pobreza monetaria total y extrema 2014-2025 (% de la población)"
      description="Porcentaje de personas cuyo ingreso mensual es inferior a la línea de pobreza (2025: $482.041/mes/persona) o extrema pobreza (2025: $211.510). La línea vertical marca 2019, cuando el DANE actualizó la metodología y calibró la línea de pobreza. Las series antes y después de 2019 no son directamente comparables. En pandemia (2020) subió 6,8 pp; desde entonces bajó 14,5 pp hasta 2025. Petro heredó la curva ya descendente y continuó la reducción."
      source="DANE — Pobreza Monetaria 2025 (jul 2026). Cambio metodológico documentado en la publicación oficial."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Pobreza monetaria total" />
          <LegendItem color={COLORS.amber} label="Pobreza extrema" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
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
            domain={[0, 50]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string, item) => {
              const d = item.payload as (typeof data)[number];
              const label = name === "total" ? "Pobreza total" : "Pobreza extrema";
              return [`${value.toFixed(1)}%  ·  ${d.gobierno}`, label];
            }}
          />
          <ReferenceLine
            x="2019"
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
          <ReferenceLine
            x="2022"
            stroke="#a3a3a3"
            strokeDasharray="3 3"
            label={{
              value: "Petro",
              position: "insideBottomRight",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar dataKey="total" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.total >= 40
                    ? COLORS.rose
                    : d.total >= 30
                      ? COLORS.amber
                      : COLORS.emerald
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="extrema"
            stroke={COLORS.amber}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.amber }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>La caída de la pobreza es real, pero parte era rebote pandémico.</strong>
        De 2020 (42,5%) a 2025 (28,0%) la reducción fue 14,5 pp. Pero
        <strong> 6,3 pp de esa caída ocurrieron entre 2020 y 2022</strong>
        (rebote post-pandemia bajo Duque). Bajo Petro (2022→2025) la caída
        fue de 8,6 pp — sigue siendo significativa, pero no todo mérito
        exclusivo del gobierno saliente. Además, el nivel actual (28%)
        <strong> sigue siendo superior al pre-pandemia con la nueva
        metodología</strong> (2018: 27,0%).
      </div>
    </ChartFrame>
  );
}
