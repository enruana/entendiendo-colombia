import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Serie historica del total de integrantes en grupos armados ilegales
// Fuente: FIP - Informes anuales 2018-2026
// 2018: 12.883
// 2022: 15.120
// Dic 2024: ~21.962 (implicito por +23.5% desde Dic 2024 = 27.121 en Dic 2025)
// Jul 2025: 25.278
// Dic 2025: 27.121
// Eventos clave incluyen: posconflicto, fragmentacion disidencias, expansion AGC
const data = [
  { fecha: "2018", periodo: "Dic 2018", total: 12883, evento: "Posconflicto FARC" },
  { fecha: "2022", periodo: "Dic 2022", total: 15120, evento: "Cambio de gobierno" },
  { fecha: "2024", periodo: "Dic 2024", total: 21962, evento: "Inicio Paz Total año 2" },
  { fecha: "2025-jul", periodo: "Jul 2025", total: 25278, evento: "+15% en 7 meses" },
  { fecha: "2025-dic", periodo: "Dic 2025", total: 27121, evento: "Máximo histórico" },
];

export default function EvolucionTotalGrupos() {
  return (
    <ChartFrame
      number="Gráfica 2 · Evolución histórica"
      title="Crecimiento del total de integrantes en grupos armados 2018-2026"
      description="Total estimado de integrantes (combatientes en armas + redes de apoyo) en los grupos armados ilegales activos. En 2025, el 48% son combatientes en armas y 52% son redes de apoyo (logística, milicianos, mensajeros, sicariato). El total más que se duplicó entre 2018 y 2025: pasó de 12.883 a 27.121 integrantes."
      source="Fundación Ideas para la Paz (FIP) — Balance anual 2018-2025 e informe enero 2026. Cifras de FIP cruzadas con MinDefensa cuando hay versión pública."
      legend={
        <>
          <LegendItem color={COLORS.slate} label="Integrantes (combatientes + apoyo)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 35, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="periodo"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            angle={-15}
            textAnchor="end"
            height={50}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            domain={[10000, 30000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value.toLocaleString("es-CO")} integrantes  ·  ${d.evento}`,
                "",
              ];
            }}
          />
          <Bar
            dataKey="total"
            fill={COLORS.slate}
            fillOpacity={0.25}
            radius={[6, 6, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke={COLORS.slate}
            strokeWidth={3}
            dot={{ r: 6, fill: COLORS.slate }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: number) => v.toLocaleString("es-CO")}
              style={{ fontSize: 12, fontWeight: 700, fill: "#171717" }}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 leading-relaxed">
        <strong>+110% entre 2018 y 2025.</strong> El total casi se duplica en siete
        años. El salto más fuerte ocurrió entre dic-2024 y jul-2025 (+15% en siete
        meses) y se prolongó hasta dic-2025 (+23,5% acumulado año). El crecimiento se
        explica por la expansión del Clan del Golfo, el rearme de disidencias FARC y
        el reciclaje de combatientes desmovilizados que retornaron a las filas.
      </div>
    </ChartFrame>
  );
}
