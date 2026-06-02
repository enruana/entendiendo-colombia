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

// Indepaz: masacres y víctimas por año
const data = [
  { anio: 2020, masacres: 96, victimas: 338 },
  { anio: 2021, masacres: 96, victimas: 338 },
  { anio: 2022, masacres: 94, victimas: 300 },
  { anio: 2023, masacres: 93, victimas: 300 },
  { anio: 2024, masacres: 76, victimas: 267 },
  { anio: 2025, masacres: 78, victimas: 256 },
];

export default function MasacresHistorico() {
  return (
    <ChartFrame
      number="Gráfica 1 · Masacres"
      title="Masacres y víctimas en Colombia 2020-2025 (Indepaz)"
      description="Una masacre se define como el homicidio intencional y simultáneo de 3 o más personas en estado de indefensión, por un mismo perpetrador, en circunstancias equivalentes de modo, tiempo y lugar (definición Indepaz). El conteo muestra una tendencia descendente desde 2023 pero sin recuperar el patrón pre-Acuerdo. En los primeros meses de 2026 ya se reportaron 35 masacres, la cifra trimestral más alta desde 2020."
      source="Indepaz — Observatorio de Derechos Humanos y Conflictos. Conteo anual de masacres."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Masacres" />
          <LegendItem color={COLORS.slate} label="Víctimas (eje derecho)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <ComposedChart data={data} margin={{ top: 15, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            yAxisId="left"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            domain={[0, 120]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            domain={[0, 400]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              if (name === "masacres") return [`${value} eventos`, "Masacres"];
              if (name === "victimas") return [`${value} personas`, "Víctimas mortales"];
              return [value, name];
            }}
          />
          <Bar yAxisId="left" dataKey="masacres" fill={COLORS.rose} radius={[4, 4, 0, 0]} />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="victimas"
            stroke={COLORS.slate}
            strokeWidth={3}
            dot={{ r: 5, fill: COLORS.slate }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 leading-relaxed">
        <strong>Cauca lidera en masacres todos los años</strong> (23 en 2024,
        seguido por Valle del Cauca con 13 y Antioquia con 10). En 2024 hubo una
        reducción del 26% frente a 2023, asociada en parte a los ceses al fuego de
        la Paz Total. Pero el repunte en el primer trimestre de 2026 indica que la
        tendencia se está revirtiendo.
      </div>
    </ChartFrame>
  );
}
