import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// % del empleo total que aporta cada segmento de empleador.
// Dentro de cada segmento, el split formal/informal es:
// - Micro: 15% formal · 85% informal (genera el 94% del empleo informal nacional)
// - Pyme + Grande: muy mayoritariamente formal (no desagregado por BBVA)
// Fuente: BBVA Research con GEIH may-jul 2023.
const data = [
  { tamano: "Micro", pct: 62, color: COLORS.amber, nota: "85% informal" },
  { tamano: "Pequeña + Mediana", pct: 17, color: COLORS.violet, nota: "mayormente formal" },
  { tamano: "Grande", pct: 21, color: COLORS.rose, nota: "casi todo formal" },
];

export default function EmpleoPorTamano() {
  return (
    <ChartFrame
      number="Gráfica 3 · Dónde está el empleo"
      title="Quién emplea a quién: % del empleo total por tamaño del empleador (2023)"
      description="La micro es el principal empleador del país: 62 de cada 100 ocupados trabajan allí. Pero la mayoría de ese empleo es informal (85%). El empleo formal — el que se ve en PILA y en la GEIH como cotizante — se concentra en las pymes y grandes, que juntas representan el 38% del empleo total pero casi todo el empleo con protección social."
      source="BBVA Research con DANE — Gran Encuesta Integrada de Hogares may-jul 2023"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Micro" />
          <LegendItem color={COLORS.violet} label="Pequeña + Mediana" />
          <LegendItem color={COLORS.rose} label="Grande" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="tamano"
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
            tickFormatter={(v) => `${v}%`}
            domain={[0, 70]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: { nota?: string } }) => [
              `${v}% del empleo total · ${props.payload?.nota ?? ""}`,
              "Distribución",
            ]}
          />
          <Bar dataKey="pct" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList
              dataKey="pct"
              position="top"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 13, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>Doble lectura:</strong> el 62% de los ocupados en Colombia trabaja en
        una microempresa, pero dentro de las micros solo el 15% del empleo es formal.
        El resultado: <strong>las microempresas generan el 94% del empleo informal del
        país</strong>. Mientras tanto, las grandes — que emplean al 21% — concentran el
        47% del empleo formal nacional.
      </div>
    </ChartFrame>
  );
}
