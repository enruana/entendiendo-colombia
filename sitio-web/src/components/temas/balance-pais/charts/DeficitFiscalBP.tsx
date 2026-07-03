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
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Déficit fiscal del Gobierno Nacional Central como % del PIB
// Los valores son negativos por definición (más gasto que ingreso)
const data = [
  { anio: "2014", deficit: -2.4, gobierno: "Santos I" },
  { anio: "2015", deficit: -3.1, gobierno: "Santos II" },
  { anio: "2016", deficit: -4.0, gobierno: "Santos II" },
  { anio: "2017", deficit: -3.6, gobierno: "Santos II" },
  { anio: "2018", deficit: -3.1, gobierno: "Santos II/Duque" },
  { anio: "2019", deficit: -2.5, gobierno: "Duque" },
  { anio: "2020", deficit: -7.8, gobierno: "Duque · Pandemia" },
  { anio: "2021", deficit: -7.1, gobierno: "Duque" },
  { anio: "2022", deficit: -5.3, gobierno: "Duque/Petro" },
  { anio: "2023", deficit: -4.3, gobierno: "Petro" },
  { anio: "2024", deficit: -6.7, gobierno: "Petro" },
  { anio: "2025", deficit: -6.4, gobierno: "Petro · 2° más alto siglo" },
];

export default function DeficitFiscalBP() {
  return (
    <ChartFrame
      number="Gráfica 2 · Déficit fiscal"
      title="Déficit fiscal del GNC 2014-2025 (% del PIB)"
      description="Diferencia entre ingresos y gastos del Gobierno Nacional Central. Un país fiscalmente sano opera con déficit del 2-3% del PIB. El 6,4% del 2025 es el segundo más alto del siglo XXI sin contar la pandemia (2020-2021). Comparar el 7,1% del 2021 (año pandémico) con el 6,4% del 2025 (año normal) como 'reducción' es una comparación de contextos incompatibles."
      source="MinHacienda MFMP y Plan Financiero 2025. Contraloría — Cuenta General del Presupuesto."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Déficit fiscal" />
          <LegendItem color={COLORS.emerald} label="Meta fiscal razonable (-3%)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
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
            domain={[-9, 1]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(1)}%  ·  ${d.gobierno}`, "Déficit"];
            }}
          />
          <ReferenceLine y={0} stroke="#525252" strokeWidth={1.5} />
          <ReferenceLine
            y={-3}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "Meta razonable",
              position: "insideRight",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 700,
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
          <Bar dataKey="deficit" radius={[0, 0, 4, 4]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.deficit <= -6
                    ? COLORS.rose
                    : d.deficit <= -4
                      ? COLORS.amber
                      : COLORS.slate
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="deficit"
              position="bottom"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>El déficit de 6,4% en 2025 es alarmante.</strong> Solo tuvo tres
        años peores: 2020 y 2021 (pandemia) y 2016 en algunas mediciones. En
        años normales, Colombia ha operado con déficit del 2,4%-4,0%. Un
        déficit de 6,4% sin pandemia significa: gastos altos, recaudo por
        debajo de lo proyectado, mayor endeudamiento. Y como el crecimiento
        del PIB es débil, el <strong>numerador crece más rápido que el
        denominador</strong> — deuda/PIB se acelera.
      </div>
    </ChartFrame>
  );
}
