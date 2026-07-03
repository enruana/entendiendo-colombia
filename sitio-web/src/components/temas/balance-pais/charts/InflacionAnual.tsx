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

// Inflación anual (dic-dic) según DANE IPC
// Los datos 2022-2026 incluyen contexto para el fact-check
const data = [
  { anio: "2014", ipc: 3.66, gobierno: "Santos I" },
  { anio: "2015", ipc: 6.77, gobierno: "Santos II" },
  { anio: "2016", ipc: 5.75, gobierno: "Santos II" },
  { anio: "2017", ipc: 4.09, gobierno: "Santos II" },
  { anio: "2018", ipc: 3.18, gobierno: "Santos II/Duque" },
  { anio: "2019", ipc: 3.80, gobierno: "Duque" },
  { anio: "2020", ipc: 1.61, gobierno: "Duque · Pandemia" },
  { anio: "2021", ipc: 5.62, gobierno: "Duque" },
  { anio: "2022", ipc: 13.12, gobierno: "Duque/Petro" },
  { anio: "2023", ipc: 9.28, gobierno: "Petro" },
  { anio: "2024", ipc: 5.20, gobierno: "Petro" },
  { anio: "2025", ipc: 5.31, gobierno: "Petro" },
];

const RANGO_META_MIN = 2;
const RANGO_META_MAX = 4;

export default function InflacionAnual() {
  return (
    <ChartFrame
      number="Gráfica 2 · Inflación"
      title="Inflación anual (dic-dic) 2014-2025 según DANE"
      description="Variación anual del IPC medido en diciembre. El rango meta del BanRep es 3% ± 1% (2%-4%, franja verde). La serie muestra dos episodios de inflación alta: 2015-2016 (por devaluación del peso tras caída del petróleo) y 2022-2023 (pandemia, cadenas de suministro, guerra en Ucrania). El pico del ciclo 2022-2023 fue en marzo 2023 con 13,34% anual — el más alto en 24 años — BAJO el gobierno Petro."
      source="DANE — IPC histórico. Comunicados de prensa mensuales."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="IPC anual (dic-dic)" />
          <LegendItem color={COLORS.emerald} label="Meta BanRep (3% ± 1%)" />
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
            domain={[0, 15]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(2)}%  ·  ${d.gobierno}`, "IPC"];
            }}
          />
          <ReferenceLine
            y={RANGO_META_MIN}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={1.5}
          />
          <ReferenceLine
            y={RANGO_META_MAX}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "Meta 3%±1",
              position: "insideTopRight",
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
              position: "insideTopLeft",
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
              position: "insideTopLeft",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar dataKey="ipc" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.ipc > 8 ? COLORS.rose : d.ipc > 4 ? COLORS.amber : COLORS.emerald}
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="ipc"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="ipc"
            stroke={COLORS.slate}
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>Petro NO recibió la inflación en su pico.</strong> Cuando asumió (jul
        2022), el IPC anual era 10,21%. La inflación siguió subiendo BAJO su
        gobierno hasta 13,34% en marzo 2023 — el pico más alto en 24 años. La
        posterior baja fue impulsada por la política monetaria del BanRep
        (autónomo), que subió la tasa de intervención hasta 13,25% y la mantuvo
        alta 15 meses. Atribuir la caída solo al ejecutivo es engañoso.
      </div>
    </ChartFrame>
  );
}
