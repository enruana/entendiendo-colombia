import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Cobertura afiliacion al Sistema General de Seguridad Social en Salud
// Fuente: MinSalud - SISPRO / BDUA
const data = [
  { anio: "2014", cobertura: 92.5, gobierno: "Santos I" },
  { anio: "2015", cobertura: 94.2, gobierno: "Santos II" },
  { anio: "2016", cobertura: 94.6, gobierno: "Santos II" },
  { anio: "2017", cobertura: 94.5, gobierno: "Santos II" },
  { anio: "2018", cobertura: 94.9, gobierno: "Santos II/Duque" },
  { anio: "2019", cobertura: 95.5, gobierno: "Duque" },
  { anio: "2020", cobertura: 97.5, gobierno: "Duque · Pandemia" },
  { anio: "2021", cobertura: 98.6, gobierno: "Duque" },
  { anio: "2022", cobertura: 99.2, gobierno: "Duque/Petro" },
  { anio: "2023", cobertura: 99.3, gobierno: "Petro" },
  { anio: "2024", cobertura: 99.6, gobierno: "Petro" },
  { anio: "2025", cobertura: 99.5, gobierno: "Petro · Crisis EPS" },
];

export default function CoberturaSaludBP() {
  return (
    <ChartFrame
      number="Gráfica 1 · Salud"
      title="Cobertura de afiliación al Sistema General de Seguridad Social en Salud (2014-2025)"
      description="Porcentaje de la población afiliada al sistema (contributivo + subsidiado + regímenes especiales). Colombia superó el 99% en 2022 — cobertura universal en el sentido formal. Pero cobertura no es sinónimo de acceso efectivo: las intervenciones de la Nueva EPS, Sanitas y otras (2024-2025) revelaron una crisis operativa que compromete la atención a millones de afiliados. El próximo gobierno recibe un sistema con cobertura casi universal pero con fragilidad estructural."
      source="MinSalud — Base de Datos Única de Afiliados (BDUA) / SISPRO. Corte diciembre de cada año."
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Cobertura de afiliación" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
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
            domain={[88, 102]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(1)}%  ·  ${d.gobierno}`, "Cobertura"];
            }}
          />
          <ReferenceLine
            x="2018"
            stroke="#a3a3a3"
            strokeDasharray="3 3"
            label={{
              value: "Duque",
              position: "insideBottomLeft",
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
              position: "insideBottomLeft",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar dataKey="cobertura" radius={[4, 4, 0, 0]} fill={COLORS.emerald} fillOpacity={0.8}>
            <LabelList
              dataKey="cobertura"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>La cobertura no cuenta la crisis.</strong> Colombia mantiene
        afiliación casi universal, pero desde 2023 se han <strong>intervenido
        Nueva EPS, Sanitas, Compensar</strong> y otras. Millones de afiliados
        formales enfrentan demoras en autorizaciones, restricción de
        medicamentos y ruptura de la red de servicios. La cobertura formal
        (arriba del 99%) enmascara el deterioro del acceso efectivo. El
        próximo gobierno recibe la <strong>peor crisis del sistema de salud
        desde la Ley 100 (1993)</strong>.
      </div>
    </ChartFrame>
  );
}
