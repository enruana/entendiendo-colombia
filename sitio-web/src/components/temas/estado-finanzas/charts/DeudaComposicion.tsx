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

// Deuda pública Colombia cierre 2025
// Total bruto: $1.192,6 billones (64,7% PIB)
// Interna: $838,5B (45,5% PIB) - 70%
// Externa: $354,1B (19,2% PIB) - 30%
const stackData = [
  {
    tipo: "Deuda pública 2025",
    interna: 838.5,
    externa: 354.1,
  },
];

const dataBars = [
  { categoria: "Total deuda bruta", monto: 1192.6, pct_pib: 64.7, color: COLORS.rose },
  { categoria: "Deuda interna (TES)", monto: 838.5, pct_pib: 45.5, color: COLORS.amber },
  { categoria: "Deuda externa (bonos)", monto: 354.1, pct_pib: 19.2, color: COLORS.violet },
];

export default function DeudaComposicion() {
  return (
    <ChartFrame
      number="Gráfica 1 · Deuda 2025"
      title="Cuánto debe el Estado colombiano (cierre 2025)"
      description="Al cierre de 2025, la deuda bruta del Gobierno Central llegó a $1.192,6 billones, equivalente al 64,7% del PIB. Es la mayor cifra en pesos desde el inicio de la serie en 2001, y la segunda más alta como % del PIB (solo superada por el pico de pandemia en 2020). El 70% es deuda interna (en TES denominados en pesos); el 30% es deuda externa."
      source="MinHacienda — Dirección General de Crédito Público y del Tesoro Nacional (DGCPTN), cierre 2025. PIB 2025 proyectado: ~$1.840 billones."
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Deuda interna (TES)" />
          <LegendItem color={COLORS.violet} label="Deuda externa (bonos USD/EUR + multilateral)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dataBars}
          layout="vertical"
          margin={{ top: 20, right: 80, left: 50, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${v}B`}
          />
          <YAxis
            type="category"
            dataKey="categoria"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            width={180}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof dataBars)[number];
              return [
                `$${value.toFixed(1)} billones  (${d.pct_pib}% del PIB)`,
                "",
              ];
            }}
          />
          <Bar dataKey="monto" radius={[0, 6, 6, 0]}>
            {dataBars.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList
              dataKey="pct_pib"
              position="right"
              formatter={(v: number) => `${v.toFixed(1)}% PIB`}
              style={{ fontSize: 12, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>La deuda creció +16,7% en un año (+$170,6 billones desde dic 2024).</strong>{" "}
        Estas cifras reflejan la dinámica acelerada de los últimos años: cuando el
        gasto crece más rápido que el ingreso tributario, la diferencia se cubre
        emitiendo más deuda. Ese es exactamente el patrón observado entre 2023 y 2025.
      </div>
    </ChartFrame>
  );
}
