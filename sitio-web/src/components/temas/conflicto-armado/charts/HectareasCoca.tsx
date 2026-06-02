import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Serie hectareas de coca UNODC SIMCI Colombia 2001-2024
// Datos compilados de informes anuales SIMCI/UNODC
const data = [
  { anio: 2001, hectareas: 144800, eventos: "" },
  { anio: 2002, hectareas: 102000, eventos: "" },
  { anio: 2003, hectareas: 86000, eventos: "" },
  { anio: 2004, hectareas: 80000, eventos: "Plan Patriota" },
  { anio: 2005, hectareas: 86000, eventos: "" },
  { anio: 2006, hectareas: 78000, eventos: "" },
  { anio: 2007, hectareas: 99000, eventos: "" },
  { anio: 2008, hectareas: 81000, eventos: "" },
  { anio: 2009, hectareas: 73000, eventos: "" },
  { anio: 2010, hectareas: 62000, eventos: "Mínimo histórico" },
  { anio: 2011, hectareas: 64000, eventos: "" },
  { anio: 2012, hectareas: 48000, eventos: "" },
  { anio: 2013, hectareas: 48000, eventos: "" },
  { anio: 2014, hectareas: 69000, eventos: "Suspensión glifosato" },
  { anio: 2015, hectareas: 96000, eventos: "" },
  { anio: 2016, hectareas: 146000, eventos: "Acuerdo FARC" },
  { anio: 2017, hectareas: 171000, eventos: "" },
  { anio: 2018, hectareas: 169000, eventos: "" },
  { anio: 2019, hectareas: 154000, eventos: "" },
  { anio: 2020, hectareas: 143000, eventos: "" },
  { anio: 2021, hectareas: 204000, eventos: "" },
  { anio: 2022, hectareas: 230000, eventos: "" },
  { anio: 2023, hectareas: 253000, eventos: "" },
  { anio: 2024, hectareas: 262000, eventos: "Récord histórico" },
];

export default function HectareasCoca() {
  return (
    <ChartFrame
      number="Gráfica 1 · Coca histórica"
      title="Hectáreas de coca cultivada en Colombia 2001-2024 (UNODC SIMCI)"
      description="Censo anual de cultivos ilícitos. Colombia tuvo su mínimo histórico en 2012-2013 (~48.000 ha) tras una década del Plan Colombia. La curva se invierte tras la suspensión de la aspersión con glifosato (2015) y el Acuerdo de Paz con las FARC (2016). En 2024 alcanzó 262.000 hectáreas, máximo de toda la serie."
      source="UNODC SIMCI — Censo anual de cultivos de coca en Colombia, 2001-2024"
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Hectáreas cultivadas" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={data} margin={{ top: 15, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-30}
            textAnchor="end"
            height={50}
            interval={1}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K ha`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              const event = d.eventos ? ` · ${d.eventos}` : "";
              return [`${value.toLocaleString("es-CO")} hectáreas${event}`, ""];
            }}
          />
          <Bar
            dataKey="hectareas"
            fill={COLORS.rose}
            fillOpacity={0.7}
            radius={[3, 3, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="hectareas"
            stroke={COLORS.rose}
            strokeWidth={2}
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>El cultivo nunca había sido tan alto.</strong> 262.000 hectáreas en
        2024 — más de cinco veces el mínimo de 2013. La capacidad potencial de
        producción de cocaína alcanzó <strong>2.664 toneladas en 2023</strong>, según
        SIMCI/UNODC. El crecimiento de los grupos armados (capítulo 1) y la expansión
        de los cultivos están directamente conectados.
      </div>
    </ChartFrame>
  );
}
