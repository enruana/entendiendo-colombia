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
import ChartFrame from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Cifras DIAN 2025 anual, en billones de pesos
// renta_total=137, iva_int=75.5, iva_ext=40.7, gmf=16.3
// otros = total - sumados = 294.5 - 269.5 = 25 (aprox)
const data = [
  { tipo: "Renta y complementarios", monto: 137.0, pct: 46.5 },
  { tipo: "IVA interno (consumo)", monto: 75.5, pct: 25.7 },
  { tipo: "IVA externo (importaciones)", monto: 40.7, pct: 13.8 },
  { tipo: "GMF (4×1000)", monto: 16.3, pct: 5.5 },
  { tipo: "Otros (consumo, gasolina, etc.)", monto: 25.0, pct: 8.5 },
];

const colorMap: Record<string, string> = {
  "Renta y complementarios": COLORS.emerald,
  "IVA interno (consumo)": COLORS.cyan,
  "IVA externo (importaciones)": COLORS.violet,
  "GMF (4×1000)": COLORS.amber,
  "Otros (consumo, gasolina, etc.)": COLORS.slate,
};

export default function ComposicionRecaudo2025() {
  return (
    <ChartFrame
      number="Gráfica 2 · Composición 2025"
      title="¿Qué impuestos cargan más en 2025?"
      description="Recaudo DIAN 2025 desagregado por tipo de tributo, en billones de pesos. Casi la mitad viene del impuesto de renta. El IVA (interno + externo) representa el 40%. El GMF (4×1000) aporta el 5,5%. Estas cuatro categorías cubren más del 90% del recaudo nacional."
      source="DIAN — Estadísticas de recaudo 2025"
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, left: 50, bottom: 10 }}
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
            dataKey="tipo"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={210}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`$${value.toFixed(1)} billones (${d.pct}%)`, "Recaudo"];
            }}
          />
          <Bar dataKey="monto" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={colorMap[d.tipo]} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 12, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
