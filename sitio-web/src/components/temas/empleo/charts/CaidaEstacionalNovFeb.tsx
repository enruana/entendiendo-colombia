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

// Caida estacional PILA noviembre -> febrero (cotizantes pierden post fin de
// contratos temporales). Datos verificados con informes oficiales UGPP y, para
// 2022 y 2023, presentaciones UGPP nov2023/dic2023.
const data = [
  { ciclo: "2022 → 2023", max: 13834317, min: 12881000, pctDrop: 6.89 },
  { ciclo: "2023 → 2024", max: 13604765, min: 12844462, pctDrop: 5.59 },
  { ciclo: "2024 → 2025", max: 13910000, min: 12972258, pctDrop: 6.74 },
  { ciclo: "2025 → 2026", max: 14239988, min: 13163895, pctDrop: 7.56 },
];

const MAX_PCT = Math.max(...data.map((d) => d.pctDrop));

export default function CaidaEstacionalNovFeb() {
  return (
    <ChartFrame
      number="Gráfica 3 · Caída estacional"
      title="Cotizantes que pierde PILA cada año entre noviembre y febrero"
      description="Porcentaje de cotizantes que se pierden en cada ciclo nov → feb, comparando los cuatro últimos años. La caída es estacional (cierre de contratos temporales de fin de año), pero su magnitud ha venido creciendo."
      source="UGPP — informes oficiales mensuales feb'24-feb'26, presentaciones nov'23/dic'23 y dato feb'23 vía prensa económica"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Ciclo con mayor caída" />
          <LegendItem color={COLORS.slate} label="Ciclos anteriores" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 25, right: 25, left: 0, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="ciclo"
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
            tickFormatter={(v) => `${v}%`}
            domain={[0, 9]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value.toFixed(2)}%  (${d.max.toLocaleString("es-CO")} → ${d.min.toLocaleString("es-CO")})`,
                "Caída nov → feb",
              ];
            }}
          />
          <Bar dataKey="pctDrop" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.pctDrop === MAX_PCT ? COLORS.amber : COLORS.slate}
              />
            ))}
            <LabelList
              dataKey="pctDrop"
              position="top"
              formatter={(v: number) => `${v.toFixed(2)}%`}
              style={{ fontSize: 12, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
