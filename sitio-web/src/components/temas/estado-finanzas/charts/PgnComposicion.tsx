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

// PGN 2026: $546.9 billones aprobados (Congreso, octubre 2025)
// Distribución por tipo de gasto:
// Funcionamiento ~65% = $355 B
// Inversión ~16% = $88.4 B (anunciado por gobierno)
// Servicio deuda ~19% = $103.5 B
const tipoData = [
  { tipo: "Funcionamiento", monto: 355.0, pct: 64.9 },
  { tipo: "Servicio deuda", monto: 103.5, pct: 18.9 },
  { tipo: "Inversión", monto: 88.4, pct: 16.2 },
];

const colorMap: Record<string, string> = {
  Funcionamiento: COLORS.amber,
  "Servicio deuda": COLORS.rose,
  Inversión: COLORS.emerald,
};

export default function PgnComposicion() {
  return (
    <ChartFrame
      number="Gráfica 1 · PGN 2026"
      title="Cómo se distribuye el Presupuesto General de la Nación 2026"
      description="El PGN 2026 fue aprobado en octubre de 2025 por $546,9 billones. Se divide en tres grandes rubros: funcionamiento (sueldos, transferencias y gastos generales), servicio de la deuda (pago de intereses y amortización del capital) e inversión (proyectos del Banco de Programas). Casi $2 de cada $3 son funcionamiento."
      source="Ley anual del PGN 2026 — Congreso de la República (16-oct-2025) + comunicación oficial DNP"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Funcionamiento" />
          <LegendItem color={COLORS.rose} label="Servicio deuda" />
          <LegendItem color={COLORS.emerald} label="Inversión" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={tipoData}
          layout="vertical"
          margin={{ top: 20, right: 80, left: 40, bottom: 10 }}
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
            fontSize={12}
            width={140}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof tipoData)[number];
              return [`$${value.toFixed(1)} billones (${d.pct}%)`, "PGN 2026"];
            }}
          />
          <Bar dataKey="monto" radius={[0, 6, 6, 0]}>
            {tipoData.map((d, i) => (
              <Cell key={i} fill={colorMap[d.tipo]} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 13, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>El servicio de la deuda ya es más grande que la inversión.</strong> En
        2026, por cada peso que el Estado invierte en proyectos nuevos, gasta $1,17 en
        pagar intereses y capital de la deuda. Hace 10 años esa relación era ~$0,75. La
        deuda creciente está desplazando a la inversión.
      </div>
    </ChartFrame>
  );
}
