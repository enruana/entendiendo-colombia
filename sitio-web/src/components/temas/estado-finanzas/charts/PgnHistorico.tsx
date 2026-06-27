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
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// PGN aprobado por anio 2015-2026, en billones de pesos corrientes.
// PIB Colombia en billones de pesos corrientes para calcular % PGN/PIB.
// Fuentes: Leyes anuales de presupuesto, MinHacienda, comunicados de Senado/Camara
// PIB: DANE Cuentas Nacionales Anuales (corrientes)
const data = [
  { anio: 2015, pgn: 203.6, pib: 800, gobierno: "Santos II" },
  { anio: 2016, pgn: 215.9, pib: 864, gobierno: "Santos II" },
  { anio: 2017, pgn: 224.4, pib: 920, gobierno: "Santos II" },
  { anio: 2018, pgn: 235.6, pib: 985, gobierno: "Santos II / Duque" },
  { anio: 2019, pgn: 258.9, pib: 1061, gobierno: "Duque" },
  { anio: 2020, pgn: 271.7, pib: 999, gobierno: "Duque · Pandemia" },
  { anio: 2021, pgn: 313.9, pib: 1193, gobierno: "Duque · Reactivación" },
  { anio: 2022, pgn: 350.4, pib: 1461, gobierno: "Duque / Petro" },
  { anio: 2023, pgn: 405.6, pib: 1583, gobierno: "Petro" },
  { anio: 2024, pgn: 502.6, pib: 1690, gobierno: "Petro" },
  { anio: 2025, pgn: 511.0, pib: 1840, gobierno: "Petro" },
  { anio: 2026, pgn: 547.0, pib: 2000, gobierno: "Petro" },
];

// Agregar % del PIB
const dataWithPct = data.map((d) => ({
  ...d,
  pctPib: (d.pgn / d.pib) * 100,
}));

const growth = (
  ((data[data.length - 1].pgn - data[0].pgn) / data[0].pgn) *
  100
).toFixed(0);

export default function PgnHistorico() {
  return (
    <ChartFrame
      number="Gráfica 3 · Histórico"
      title="Cómo ha crecido el PGN en los últimos 12 años (2015-2026)"
      description={`Monto del Presupuesto General de la Nación aprobado por el Congreso cada año, en billones de pesos corrientes (barras). La línea roja muestra el PGN como porcentaje del PIB. El presupuesto pasó de $203,6 B (2015) a $547 B (2026): un crecimiento nominal del ${growth}%. Como % del PIB ha oscilado entre 24% y 30%, con picos durante la pandemia (2020) y bajo el gobierno Petro (2024).`}
      source="Leyes anuales del PGN — Senado y Cámara de Representantes · MinHacienda · DANE Cuentas Nacionales (PIB corriente)."
      legend={
        <>
          <LegendItem color={COLORS.violet} label="PGN (billones COP)" />
          <LegendItem color={COLORS.rose} label="PGN / PIB (%)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={dataWithPct} margin={{ top: 30, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
          />
          <YAxis
            yAxisId="left"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${v}B`}
            domain={[0, 600]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v.toFixed(0)}%`}
            domain={[15, 35]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string, item) => {
              const d = item.payload as (typeof dataWithPct)[number];
              if (name === "pgn")
                return [`$${value.toFixed(1)} billones  ·  ${d.gobierno}`, "PGN aprobado"];
              if (name === "pctPib")
                return [`${value.toFixed(1)}% del PIB`, ""];
              return [value, name];
            }}
          />
          <ReferenceLine
            x={2018}
            yAxisId="left"
            stroke="#525252"
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Inicia Duque",
              position: "insideTopRight",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x={2022}
            yAxisId="left"
            stroke="#525252"
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Inicia Petro",
              position: "insideTopRight",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="pgn"
            fill={COLORS.violet}
            fillOpacity={0.85}
            radius={[4, 4, 0, 0]}
          >
            <LabelList
              dataKey="pgn"
              position="top"
              formatter={(v: number) => `$${v.toFixed(0)}`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pctPib"
            stroke={COLORS.rose}
            strokeWidth={3}
            dot={{ r: 5, fill: COLORS.rose }}
            activeDot={{ r: 7 }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>El PGN se multiplicó por 2,7 en 12 años</strong> en pesos corrientes,
        pero gran parte es inflación. Como % del PIB el crecimiento ha sido más
        modesto: del 25,5% al 27,4%. El salto más fuerte en términos reales ocurrió
        entre 2022 y 2024 (de $350 B a $502 B, +44%), bajo el gobierno Petro y con
        la reforma tributaria de 2022 ampliando los ingresos. La inflación, las
        reformas tributarias y los choques externos (pandemia) explican las
        oscilaciones del % PIB.
      </div>
    </ChartFrame>
  );
}
