import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Corruption Perceptions Index, Transparency International
// Escala 0 (mas corrupto) - 100 (menos corrupto)
// Colombia historico - serie publica anual
const data = [
  { anio: 2012, score: 36 },
  { anio: 2013, score: 36 },
  { anio: 2014, score: 37 },
  { anio: 2015, score: 37 },
  { anio: 2016, score: 37 },
  { anio: 2017, score: 37 },
  { anio: 2018, score: 36 },
  { anio: 2019, score: 37 },
  { anio: 2020, score: 39 },
  { anio: 2021, score: 39 },
  { anio: 2022, score: 39 },
  { anio: 2023, score: 40 },
  { anio: 2024, score: 39 },
];

export default function CpiColombia() {
  return (
    <ChartFrame
      number="Gráfica 1 · Índice de percepción de corrupción"
      title="Colombia en el Corruption Perceptions Index 2012-2024"
      description="El CPI mide la percepción de corrupción en el sector público de 180 países, en escala 0-100. 0 = altamente corrupto; 100 = muy limpio. Colombia ha oscilado entre 36 y 40 puntos en los últimos 13 años, sin mejora estructural. La línea verde marca el promedio OCDE (~66), la rosa el promedio América Latina (~43). Estamos por debajo de ambos."
      source="Transparencia Internacional — Corruption Perceptions Index 2012-2024"
      legend={
        <>
          <LegendItem color={COLORS.cyan} label="Colombia" shape="line" />
          <LegendItem color={COLORS.rose} label="Promedio A. Latina" shape="line" />
          <LegendItem color={COLORS.emerald} label="Promedio OCDE" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <LineChart data={data} margin={{ top: 15, right: 30, left: 0, bottom: 30 }}>
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
            domain={[20, 80]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [`${value} puntos`, "CPI"]}
          />
          <ReferenceLine
            y={66}
            stroke={COLORS.emerald}
            strokeDasharray="5 3"
            strokeWidth={1.5}
            label={{
              value: "OCDE ~66",
              position: "right",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            y={43}
            stroke={COLORS.rose}
            strokeDasharray="5 3"
            strokeWidth={1.5}
            label={{
              value: "A.Latina ~43",
              position: "right",
              fill: COLORS.rose,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke={COLORS.cyan}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.cyan }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50/50 p-3 text-xs text-cyan-900 leading-relaxed">
        <strong>Colombia se ha mantenido casi sin cambios durante 13 años</strong>. El
        puntaje subió ligeramente de 36 (2012) a 39 (2024), con un máximo de 40 en
        2023. En ranking global, Colombia ocupa el puesto ~87 de 180 países. Brasil
        está en posición similar; Chile y Uruguay lideran la región con 67 y 76
        puntos respectivamente.
      </div>
    </ChartFrame>
  );
}
