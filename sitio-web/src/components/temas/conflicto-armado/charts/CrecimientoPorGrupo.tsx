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

// Comparacion por grupo Dic 2024 -> Dic 2025
// Datos FIP enero 2026
const data = [
  { grupo: "Clan del Golfo (AGC)", dic2024: 7540, dic2025: 9840, color: COLORS.amber },
  { grupo: "ELN", dic2024: 6246, dic2025: 6810, color: COLORS.rose },
  { grupo: "EMC (disidencia FARC)", dic2024: 3267, dic2025: 4019, color: COLORS.violet },
  { grupo: "EMBF (disidencia FARC)", dic2024: 2425, dic2025: 2958, color: COLORS.cyan },
  { grupo: "CNEB (escisión)", dic2024: 1671, dic2025: 2089, color: COLORS.emerald },
  { grupo: "Segunda Marquetalia", dic2024: 464, dic2025: 534, color: COLORS.slate },
];

const dataWithDiff = data.map((d) => ({
  ...d,
  diff: d.dic2025 - d.dic2024,
  pct: ((d.dic2025 - d.dic2024) / d.dic2024) * 100,
}));

export default function CrecimientoPorGrupo() {
  return (
    <ChartFrame
      number="Gráfica 3 · Crecimiento 2024-2025"
      title="Cuánto creció cada grupo entre dic-2024 y dic-2025"
      description="Comparación lado a lado del conteo de integrantes por grupo entre diciembre de 2024 y diciembre de 2025. Todos crecieron. El Clan del Golfo (AGC) sumó la mayor cantidad de hombres (+2.300), seguido por las disidencias EMC y EMBF de las FARC. El ELN tuvo el crecimiento porcentual más bajo (+9%), pero sigue siendo el segundo grupo más numeroso."
      source="FIP — Informe enero 2026. Cifras del 'inicio de año 2026' que reflejan el corte a diciembre 2025."
      legend={
        <>
          <LegendItem color={COLORS.slate} label="Dic 2024 (línea base)" />
          <LegendItem color={COLORS.rose} label="Dic 2025 (12 meses después)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={dataWithDiff}
          layout="vertical"
          margin={{ top: 10, right: 80, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
          />
          <YAxis
            type="category"
            dataKey="grupo"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={200}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string, item) => {
              const d = item.payload as (typeof dataWithDiff)[number];
              if (name === "dic2024") return [`${value.toLocaleString("es-CO")}`, "Dic 2024"];
              if (name === "dic2025")
                return [
                  `${value.toLocaleString("es-CO")}  (+${d.diff.toLocaleString("es-CO")}, +${d.pct.toFixed(1)}%)`,
                  "Dic 2025",
                ];
              return [value, name];
            }}
          />
          <Bar dataKey="dic2024" radius={[0, 4, 4, 0]} fill={COLORS.slate} fillOpacity={0.5} />
          <Bar dataKey="dic2025" radius={[0, 4, 4, 0]}>
            {dataWithDiff.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList
              dataKey="pct"
              position="right"
              formatter={(v: number) => `+${v.toFixed(1)}%`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>El Clan del Golfo lideró el aumento absoluto.</strong> +2.300 hombres
        en un año — más que todos los demás grupos juntos en términos de nuevos
        reclutas. CNEB (+25%) tuvo el mayor crecimiento porcentual, EMC (+23%) y EMBF
        (+22%) le siguen. Solo el ELN creció por debajo del 10%, pero su tamaño
        absoluto sigue siendo importante. La pregunta de fondo es qué hace cada
        grupo con esos nuevos integrantes.
      </div>
    </ChartFrame>
  );
}
