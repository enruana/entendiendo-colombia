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
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Denuncias de extorsion en Colombia segun GAULA / MinDefensa
// Datos consolidados de prensa especializada y reportes Defensoria
const data = [
  { anio: 2015, denuncias: 5480 },
  { anio: 2016, denuncias: 5750 },
  { anio: 2017, denuncias: 5230 },
  { anio: 2018, denuncias: 6280 },
  { anio: 2019, denuncias: 7960 },
  { anio: 2020, denuncias: 2072 },
  { anio: 2021, denuncias: 6320 },
  { anio: 2022, denuncias: 9791 },
  { anio: 2023, denuncias: 11078 },
  { anio: 2024, denuncias: 13802 },
  { anio: 2025, denuncias: 13417 },
];

export default function ExtorsionAnual() {
  return (
    <ChartFrame
      number="Gráfica 2 · Extorsión"
      title="Denuncias de extorsión en Colombia 2015-2025"
      description="Casos denunciados ante el GAULA (Grupo de Acción Unificada por la Libertad Personal) y consolidados por MinDefensa. La caída de 2020 corresponde a la pandemia COVID-19 — no es que hubiera menos extorsión sino que las denuncias se redujeron. Desde 2022 el delito se triplicó: 2024 marcó el récord de las últimas tres décadas con 13.802 casos. Las denuncias son apenas la punta del iceberg: se estima que solo se denuncia 1 de cada 4 casos por miedo a represalias."
      source="GAULA Policía y Ejército · MinDefensa · El Tiempo (consolidado de cifras oficiales)."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Denuncias anuales" />
          <LegendItem color={COLORS.slate} label="Tendencia" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
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
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [
              `${value.toLocaleString("es-CO")} denuncias`,
              "GAULA",
            ]}
          />
          <Bar dataKey="denuncias" fill={COLORS.rose} fillOpacity={0.85} radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="denuncias"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="denuncias"
            stroke={COLORS.slate}
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>De 5.480 (2015) a 13.802 denuncias (2024): +152%.</strong> El delito
        se triplicó desde 2020 (caída pandémica de denuncia, no de extorsión). El
        53% de las extorsiones se realizan <em>desde las cárceles</em>: detenidos
        que llaman extorsionando comerciantes con datos comprados a redes externas.
        La impunidad supera el 90%.
      </div>
    </ChartFrame>
  );
}
