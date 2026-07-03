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
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Pobreza multidimensional (IPM) Colombia según DANE
// 15 privaciones agrupadas en 5 dimensiones (educación, salud, trabajo,
// niñez y juventud, condiciones de vivienda y servicios públicos)
const data = [
  { anio: "2014", ipm: 21.9, gobierno: "Santos I" },
  { anio: "2015", ipm: 20.2, gobierno: "Santos II" },
  { anio: "2016", ipm: 17.8, gobierno: "Santos II" },
  { anio: "2017", ipm: 17.0, gobierno: "Santos II" },
  { anio: "2018", ipm: 19.6, gobierno: "Santos II · Nuevo IPM" },
  { anio: "2019", ipm: 17.5, gobierno: "Duque" },
  { anio: "2020", ipm: 18.1, gobierno: "Duque · Pandemia" },
  { anio: "2021", ipm: 16.0, gobierno: "Duque" },
  { anio: "2022", ipm: 12.9, gobierno: "Duque/Petro" },
  { anio: "2023", ipm: 11.5, gobierno: "Petro" },
  { anio: "2024", ipm: 11.5, gobierno: "Petro" },
];

export default function PobrezaMultidimensionalBP() {
  return (
    <ChartFrame
      number="Gráfica 3 · Pobreza multidimensional"
      title="Índice de Pobreza Multidimensional (IPM) 2014-2024"
      description="Porcentaje de personas con al menos 33% de privaciones sobre 15 indicadores agrupados en 5 dimensiones: educación, salud, trabajo, niñez y juventud, condiciones de vivienda y servicios públicos. A diferencia de la pobreza monetaria, el IPM mide privaciones no monetarias. El descenso ha sido más consistente que en la pobreza monetaria: del 21,9% en 2014 al 11,5% en 2024. La mejora se explica principalmente por mayor acceso a salud, agua y saneamiento."
      source="DANE — Índice de Pobreza Multidimensional 2024 (publicado 2025). Metodología alineada con Alkire-Foster y Oxford Poverty & Human Development Initiative."
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="IPM" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
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
            domain={[0, 25]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(1)}%  ·  ${d.gobierno}`, "IPM"];
            }}
          />
          <ReferenceLine
            x="2018"
            stroke={COLORS.slate}
            strokeDasharray="6 3"
            strokeWidth={1.5}
            label={{
              value: "Nuevo IPM",
              position: "insideTopLeft",
              fill: COLORS.slate,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x="2022"
            stroke="#a3a3a3"
            strokeDasharray="3 3"
            label={{
              value: "Petro",
              position: "insideTopRight",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar dataKey="ipm" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={COLORS.emerald}
                fillOpacity={d.anio === "2020" ? 0.4 : 0.85}
              />
            ))}
            <LabelList
              dataKey="ipm"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>El IPM es una buena noticia estructural.</strong> Bajó del 21,9%
        (2014) al 11,5% (2024): reducción de 10,4 pp en una década. La caída
        es consistente entre gobiernos: Santos redujo ~5 pp (con nueva
        metodología en 2018), Duque logró seguir bajando pese a la pandemia,
        y Petro estabilizó en el nivel más bajo de la serie. Esto sugiere que
        el <strong>gasto social bien focalizado</strong> (Familias en Acción,
        Colombia Mayor, cobertura salud, agua rural) sí produce resultados
        sostenidos en el tiempo.
      </div>
    </ChartFrame>
  );
}
