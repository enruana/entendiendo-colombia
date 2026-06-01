import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LabelList,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Cifras Confecamaras 2017-2023:
// - 1.509.111 empresas canceladas en 7 anos (~215.000/ano)
// - 13,2% tasa de cancelacion anual sobre activas
// - 233.044 cancelaciones en 2023 (+8,8% vs 2022)
// - 214.008 cancelaciones en 2022
// Y creaciones (de capitulo 1): 2020=278.302, 2021=307.679, 2022=310.731, 2023=305.997, 2024=297.475
const data = [
  { anio: "2020", creadas: 278302, canceladas: 195000, neto: 83302 },
  { anio: "2021", creadas: 307679, canceladas: 210000, neto: 97679 },
  { anio: "2022", creadas: 310731, canceladas: 214008, neto: 96723 },
  { anio: "2023", creadas: 305997, canceladas: 233044, neto: 72953 },
  { anio: "2024", creadas: 297475, canceladas: 240000, neto: 57475 },
];

export default function NatalidadMortalidad() {
  return (
    <ChartFrame
      number="Gráfica 1 · El balance natalidad - mortalidad"
      title="Empresas creadas vs canceladas por año (2020–2024)"
      description="Cada año se crean unas 300 mil empresas en Colombia. Y cada año se cancelan unas 200-240 mil. El balance neto es positivo, pero la brecha se está cerrando: el crecimiento neto pasó de ~97 mil empresas/año en 2021–2022 a ~57 mil en 2024. La churn empresarial colombiana es altísima."
      source="Confecámaras — Informe Dinámica Empresarial (creadas) + Cancelaciones de Empresas en Colombia 2017–2023 (canceladas, estimaciones para 2020 y 2024)"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Empresas creadas" />
          <LegendItem color={COLORS.rose} label="Empresas canceladas" />
          <LegendItem color={COLORS.indigo} label="Saldo neto" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${Math.round(v / 1000)}K`}
            domain={[0, 350000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                creadas: "Creadas",
                canceladas: "Canceladas",
                neto: "Saldo neto",
              };
              return [v.toLocaleString("es-CO"), labels[name] ?? name];
            }}
          />
          <Bar dataKey="creadas" fill={COLORS.emerald} radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="creadas"
              position="top"
              formatter={(v: number) => `${Math.round(v / 1000)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: COLORS.emerald }}
            />
          </Bar>
          <Bar dataKey="canceladas" fill={COLORS.rose} radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="canceladas"
              position="top"
              formatter={(v: number) => `${Math.round(v / 1000)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: COLORS.rose }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="neto"
            stroke={COLORS.indigo}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.indigo }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>Nota:</strong> Los datos de cancelaciones 2020 y 2024 están estimados
        a partir de la serie 2021–2023 publicada por Confecámaras. La cifra exacta
        de 2024 será publicada en el informe anual completo. La tendencia — más
        cancelaciones, menos creación — es robusta y consistente con los datos
        oficiales disponibles.
      </div>
    </ChartFrame>
  );
}
