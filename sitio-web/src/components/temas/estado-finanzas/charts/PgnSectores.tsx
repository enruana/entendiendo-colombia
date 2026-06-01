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

// PGN 2026 por sector (aprox, segun comunicaciones oficiales DNP y MinHacienda)
// Educacion lidera con $88.2B (+8.1% vs 2025)
// Salud y proteccion social, Defensa, Trabajo, Hacienda son los grandes
const data = [
  { sector: "Educación", monto: 88.2, color: COLORS.cyan },
  { sector: "Hacienda (incluye deuda)", monto: 103.5, color: COLORS.rose },
  { sector: "Salud y prot. social", monto: 75.0, color: COLORS.emerald },
  { sector: "Defensa y Policía", monto: 56.0, color: COLORS.slate },
  { sector: "Trabajo (pensiones)", monto: 53.0, color: COLORS.amber },
  { sector: "Inclusión social", monto: 32.2, color: COLORS.pink },
  { sector: "Transporte", monto: 19.5, color: COLORS.violet },
  { sector: "Agricultura", monto: 6.5, color: COLORS.sky },
  { sector: "Justicia", monto: 6.0, color: COLORS.indigo },
  { sector: "Otros sectores", monto: 107.0, color: COLORS.slate },
];

// Ordenar por monto descendente
const sortedData = [...data].sort((a, b) => b.monto - a.monto);

export default function PgnSectores() {
  return (
    <ChartFrame
      number="Gráfica 2 · PGN por sector"
      title="¿En qué sectores se gasta el PGN 2026?"
      description="Distribución sectorial aproximada del PGN 2026 ($546,9 billones). Educación lidera con $88,2 billones (+8,1% vs 2025). El Sector Hacienda — que incluye el servicio de la deuda — pesa $103,5 billones. Salud, Defensa y Pensiones son los siguientes. Notar que estos rubros agrupan funcionamiento e inversión: no toda la 'plata de educación' termina en aulas, una parte cubre nómina docente y pensiones de docentes retirados."
      source="DNP — Comunicación oficial aprobación PGN 2026 (octubre 2025) + MinHacienda Mensaje Presidencial al Congreso"
    >
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={sortedData}
          layout="vertical"
          margin={{ top: 10, right: 60, left: 30, bottom: 10 }}
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
            dataKey="sector"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={170}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [
              `$${value.toFixed(1)} billones`,
              "PGN 2026",
            ]}
          />
          <Bar dataKey="monto" radius={[0, 6, 6, 0]}>
            {sortedData.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList
              dataKey="monto"
              position="right"
              formatter={(v: number) => `$${v.toFixed(1)}B`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
