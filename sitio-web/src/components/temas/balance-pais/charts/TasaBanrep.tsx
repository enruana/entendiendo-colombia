import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Tasa de intervencion Banco de la Republica (fin de anio)
// Politica monetaria autonoma del ejecutivo desde la Constitucion 1991
const data = [
  { anio: "2014", tasa: 4.5 },
  { anio: "2015", tasa: 5.75 },
  { anio: "2016", tasa: 7.5 },
  { anio: "2017", tasa: 4.75 },
  { anio: "2018", tasa: 4.25 },
  { anio: "2019", tasa: 4.25 },
  { anio: "2020", tasa: 1.75 },
  { anio: "2021", tasa: 3.0 },
  { anio: "2022", tasa: 12.0 },
  { anio: "2023", tasa: 13.0 },
  { anio: "2024", tasa: 9.5 },
  { anio: "2025", tasa: 9.25 },
  { anio: "2026", tasa: 8.5 },
];

export default function TasaBanrep() {
  return (
    <ChartFrame
      number="Gráfica 4 · Política monetaria"
      title="Tasa de intervención del Banco de la República 2014-2026"
      description="Tasa a la cual el BanRep presta a los bancos comerciales. Es la principal herramienta de política monetaria y determina, en gran medida, las tasas hipotecarias, de crédito de consumo y de tarjetas. El BanRep es autónomo del gobierno desde la Constitución de 1991: sus siete miembros de junta directiva son designados por rotación (dos por el presidente, cuatro por permanencia, uno el gerente general). El pico de 13,25% en 2023 fue la respuesta a la inflación del 13,34% de marzo."
      source="Banco de la República — Decisiones de política monetaria de la Junta Directiva."
      legend={
        <>
          <LegendItem color={COLORS.violet} label="Tasa de intervención (fin año)" shape="line" />
          <LegendItem color={COLORS.rose} label="Pico anti-inflación (2023)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <LineChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
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
            domain={[0, 15]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [`${value.toFixed(2)}%`, "Tasa"]}
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
            dataKey="tasa"
            stroke={COLORS.violet}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.violet }}
            activeDot={{ r: 6 }}
          />
          <ReferenceDot x="2023" y={13.0} r={7} fill={COLORS.rose} stroke="#fff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>Petro y el BanRep tuvieron una relación tensa</strong> durante el ciclo
        de alta inflación. El presidente cuestionó públicamente decisiones de la
        junta y propuso reformar la autonomía. La junta mantuvo la tasa en 13,25%
        entre abril 2023 y diciembre 2023, y solo empezó a bajarla cuando la
        inflación cayó consistentemente. Sin esa autonomía del banco central, el
        control de la inflación habría sido más difícil.
      </div>
    </ChartFrame>
  );
}
