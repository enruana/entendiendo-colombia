import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Coberturas educativas Colombia según MinEducación y Estadísticas SNIES
const data = [
  { anio: "2014", primaria: 96, secundaria: 78, superior: 47 },
  { anio: "2015", primaria: 96, secundaria: 79, superior: 49 },
  { anio: "2016", primaria: 96, secundaria: 80, superior: 51 },
  { anio: "2017", primaria: 96, secundaria: 82, superior: 52 },
  { anio: "2018", primaria: 96, secundaria: 82, superior: 52 },
  { anio: "2019", primaria: 97, secundaria: 83, superior: 52 },
  { anio: "2020", primaria: 95, secundaria: 82, superior: 51 },
  { anio: "2021", primaria: 96, secundaria: 83, superior: 52 },
  { anio: "2022", primaria: 97, secundaria: 85, superior: 54 },
  { anio: "2023", primaria: 97, secundaria: 86, superior: 55 },
  { anio: "2024", primaria: 97, secundaria: 87, superior: 56 },
];

export default function CoberturaEducacionBP() {
  return (
    <ChartFrame
      number="Gráfica 2 · Educación cobertura"
      title="Cobertura educativa por nivel 2014-2024 (%)"
      description="Porcentaje de la población en edad escolar que está matriculada en cada nivel educativo. Colombia tiene cobertura casi universal en primaria (~97%) desde hace décadas, pero pierde terreno en secundaria (~87%) y sobre todo en educación superior (~56%). La brecha es especialmente severa en zonas rurales y en secundaria media. Los resultados PISA muestran que la cobertura no es equivalente a calidad."
      source="MinEducación — Sistema Nacional de Información de Educación Superior (SNIES) y estadísticas del sector educativo. SNIES actualiza cifras anualmente."
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Primaria" />
          <LegendItem color={COLORS.amber} label="Secundaria" />
          <LegendItem color={COLORS.rose} label="Superior" />
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
            domain={[40, 100]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                primaria: "Primaria",
                secundaria: "Secundaria",
                superior: "Superior",
              };
              return [`${value.toFixed(1)}%`, labels[name] || name];
            }}
          />
          <ReferenceLine
            x="2018"
            stroke="#a3a3a3"
            strokeDasharray="3 3"
            label={{
              value: "Duque",
              position: "insideTopLeft",
              fill: "#525252",
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
              position: "insideTopLeft",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Line
            type="monotone"
            dataKey="primaria"
            stroke={COLORS.emerald}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.emerald }}
          />
          <Line
            type="monotone"
            dataKey="secundaria"
            stroke={COLORS.amber}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.amber }}
          />
          <Line
            type="monotone"
            dataKey="superior"
            stroke={COLORS.rose}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.rose }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50/50 p-3 text-xs text-cyan-900 leading-relaxed">
        <strong>La educación superior es la brecha estructural.</strong> Solo
        <strong> 56% de los jóvenes 17-21 años</strong> están matriculados en
        educación superior (media 2024) — muy por debajo de la meta OCDE
        (~85%) y de Chile (95%). Programas de gratuidad y crédito ICETEX
        han ampliado el acceso, pero <strong>la deserción sigue alta</strong>:
        50% no termina la carrera empezada. En zonas rurales la brecha es
        especialmente severa: menos del 30% accede a educación superior.
      </div>
    </ChartFrame>
  );
}
