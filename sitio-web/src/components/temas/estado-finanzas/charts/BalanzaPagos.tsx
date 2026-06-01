import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  LabelList,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Cuenta corriente Colombia, en USD miles de millones (USD billion)
// Negativo = deficit (salen mas dolares de los que entran)
// Datos BanRep balanza de pagos
const data = [
  { anio: "2018", balance: -14.0 },
  { anio: "2019", balance: -14.8 },
  { anio: "2020", balance: -9.4 },
  { anio: "2021", balance: -17.9 },
  { anio: "2022", balance: -21.4 },
  { anio: "2023", balance: -9.9 },
  { anio: "2024", balance: -7.4 },
];

export default function BalanzaPagos() {
  return (
    <ChartFrame
      number="Gráfica 1 · Cuenta corriente"
      title="Cuenta corriente de Colombia 2018-2024 (USD)"
      description="La cuenta corriente resume si entran o salen más dólares al país (importaciones + servicios + intereses pagados al exterior + remesas recibidas + dividendos pagados). Un saldo negativo significa que salen más. Colombia ha tenido déficit todos los años de la serie. En 2024 fue de USD 7,4 mil millones — el más bajo en 15 años, equivalente al 1,6% del PIB."
      source="BanRep — Informe trimestral de la evolución de la balanza de pagos. Cifras en miles de millones de USD."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Déficit (salen más dólares)" />
          <LegendItem color={COLORS.emerald} label="Superávit (entran más dólares)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [
              `USD ${value.toFixed(1)} mil millones`,
              value < 0 ? "Déficit" : "Superávit",
            ]}
          />
          <ReferenceLine y={0} stroke="#737373" strokeWidth={1.5} />
          <Bar dataKey="balance" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.balance >= 0 ? COLORS.emerald : COLORS.rose}
              />
            ))}
            <LabelList
              dataKey="balance"
              position="bottom"
              formatter={(v: number) => `${v.toFixed(1)}`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>El déficit corriente bajó del 6,1% del PIB en 2022 al 1,6% en 2024.</strong>{" "}
        Es el nivel más bajo en 15 años. Tres motores ayudaron: caída de las
        importaciones por desaceleración del consumo, aumento histórico de las
        remesas (USD 11,9 mil millones) y mejor balance comercial. La corrección fue
        más rápida que la prevista por el Banco de la República.
      </div>
    </ChartFrame>
  );
}
