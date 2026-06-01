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

// La asimetría central: 0,5% de las empresas (grandes) emplean al 21% de los
// ocupados, pero generan el 47% del empleo formal nacional.
// Las micros (91,8%) emplean al 62% pero la mayoría informal.
const data = [
  {
    tamano: "Micro",
    pctEmpresas: 91.8,
    pctOcupados: 62,
    pctEmpleoFormal: 6,
  },
  {
    tamano: "Pequeña + Mediana",
    pctEmpresas: 7.7,
    pctOcupados: 17,
    pctEmpleoFormal: 47,
  },
  {
    tamano: "Grande",
    pctEmpresas: 0.5,
    pctOcupados: 21,
    pctEmpleoFormal: 47,
  },
];

export default function EmpleoEmpresasPuente() {
  return (
    <ChartFrame
      number="Gráfica 1 · Las tres lecturas paralelas"
      title="Por cada tamaño: % de empresas, % de ocupados y % del empleo formal nacional"
      description="La imagen central del tema. Las micros son el 91,8% de las empresas y emplean al 62% de los ocupados — pero solo aportan ~6% del empleo formal nacional. Las grandes son apenas 0,5% del tejido pero concentran el 47% del empleo formal. Tres lecturas sobre el mismo eje muestran la asimetría que ningún número agregado captura."
      source="Confecamaras (RUES 2024) · BBVA Research / DANE GEIH may-jul 2023"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="% del total de empresas" />
          <LegendItem color={COLORS.cyan} label="% de los ocupados" />
          <LegendItem color={COLORS.violet} label="% del empleo formal nacional" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
          barCategoryGap="20%"
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
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                pctEmpresas: "% de empresas",
                pctOcupados: "% de ocupados",
                pctEmpleoFormal: "% empleo formal",
              };
              return [`${v}%`, labels[name] ?? name];
            }}
          />
          <Bar dataKey="pctEmpresas" fill={COLORS.amber} radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="pctEmpresas"
              position="top"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 11, fontWeight: 700, fill: COLORS.amber }}
            />
          </Bar>
          <Bar dataKey="pctOcupados" fill={COLORS.cyan} radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="pctOcupados"
              position="top"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 11, fontWeight: 700, fill: COLORS.cyan }}
            />
          </Bar>
          <Bar dataKey="pctEmpleoFormal" fill={COLORS.violet} radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="pctEmpleoFormal"
              position="top"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 11, fontWeight: 700, fill: COLORS.violet }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>Punto central:</strong> en cada tamaño hay una desconexión entre
        cuántas empresas son, cuánta gente emplean y cuánto empleo formal generan.
        La política pública que pretende "fortalecer al 99% de micros para combatir
        la informalidad" enfrenta un techo estructural: las micros, por su naturaleza,
        no son los principales generadores de empleo formal. Para mover esa aguja,
        hay que ayudar a las micros a crecer hacia pequeñas — o apoyar a las grandes
        a contratar más.
      </div>
    </ChartFrame>
  );
}
