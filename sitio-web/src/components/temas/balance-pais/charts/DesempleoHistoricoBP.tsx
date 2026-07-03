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

// Tasa de desempleo anual promedio nacional según DANE GEIH
const data = [
  { anio: "2014", desempleo: 9.1, gobierno: "Santos I" },
  { anio: "2015", desempleo: 8.9, gobierno: "Santos II" },
  { anio: "2016", desempleo: 9.2, gobierno: "Santos II" },
  { anio: "2017", desempleo: 9.4, gobierno: "Santos II" },
  { anio: "2018", desempleo: 9.7, gobierno: "Santos II/Duque" },
  { anio: "2019", desempleo: 10.5, gobierno: "Duque" },
  { anio: "2020", desempleo: 15.9, gobierno: "Duque · Pandemia" },
  { anio: "2021", desempleo: 13.7, gobierno: "Duque" },
  { anio: "2022", desempleo: 11.2, gobierno: "Duque/Petro" },
  { anio: "2023", desempleo: 10.2, gobierno: "Petro" },
  { anio: "2024", desempleo: 10.2, gobierno: "Petro" },
  { anio: "2025", desempleo: 8.9, gobierno: "Petro · Récord" },
];

export default function DesempleoHistoricoBP() {
  return (
    <ChartFrame
      number="Gráfica 1 · Desempleo"
      title="Tasa de desempleo anual 2014-2025 (% promedio nacional)"
      description="Porcentaje de la fuerza de trabajo que no tiene empleo pero busca activamente. El 8,9% del 2025 es el mínimo histórico de la serie GEIH y el más bajo desde 2001, según DANE. Pero la tasa esconde una condición: solo cuenta como desempleado quien busca activamente trabajo. Quien se desanimó y dejó de buscar sale del cálculo y entra en la Población Económicamente Inactiva (PEI), que ha crecido en paralelo."
      source="DANE — GEIH, promedio anual nacional. Serie 2014-2025."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Tasa de desempleo" />
          <LegendItem color={COLORS.emerald} label="Récord 2025 (8,9%)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
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
            domain={[0, 18]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(1)}%  ·  ${d.gobierno}`, "Desempleo"];
            }}
          />
          <ReferenceLine
            x="2018"
            stroke="#a3a3a3"
            strokeDasharray="3 3"
            label={{
              value: "Duque",
              position: "insideTopRight",
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
              position: "insideTopRight",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar dataKey="desempleo" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.anio === "2025"
                    ? COLORS.emerald
                    : d.desempleo >= 13
                      ? COLORS.rose
                      : COLORS.slate
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="desempleo"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="desempleo"
            stroke={COLORS.slate}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>El 8,9% de 2025 es un logro real, pero incompleto.</strong> Baja
        respecto al pico pandémico (15,9%) y al nivel de Duque prepandemia
        (~9,7%). Pero conviene mirar tres cosas: (1) la <strong>informalidad
        sigue en 55%</strong> — el empleo creció, pero mayoritariamente informal;
        (2) la <strong>PEI creció</strong>, absorbiendo desalentados; y (3) el
        48,9% de los ocupados <strong>gana menos del salario mínimo</strong>.
      </div>
    </ChartFrame>
  );
}
