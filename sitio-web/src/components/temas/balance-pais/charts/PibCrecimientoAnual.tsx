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

// Crecimiento anual del PIB Colombia 2014-2025 (DANE Cuentas Nacionales)
// Cifras confirmadas contra boletines de prensa DANE y publicaciones oficiales
const data = [
  { anio: "2014", crecimiento: 4.4, gobierno: "Santos I" },
  { anio: "2015", crecimiento: 3.1, gobierno: "Santos II" },
  { anio: "2016", crecimiento: 2.1, gobierno: "Santos II" },
  { anio: "2017", crecimiento: 1.4, gobierno: "Santos II" },
  { anio: "2018", crecimiento: 2.6, gobierno: "Santos II/Duque" },
  { anio: "2019", crecimiento: 3.2, gobierno: "Duque" },
  { anio: "2020", crecimiento: -7.2, gobierno: "Duque · Pandemia" },
  { anio: "2021", crecimiento: 10.7, gobierno: "Duque · Rebote" },
  { anio: "2022", crecimiento: 7.3, gobierno: "Duque/Petro" },
  { anio: "2023", crecimiento: 0.7, gobierno: "Petro" },
  { anio: "2024", crecimiento: 1.7, gobierno: "Petro" },
  { anio: "2025", crecimiento: 2.6, gobierno: "Petro" },
];

const promedio = (
  data.reduce((s, d) => s + d.crecimiento, 0) / data.length
).toFixed(1);

export default function PibCrecimientoAnual() {
  return (
    <ChartFrame
      number="Gráfica 1 · PIB anual"
      title="Crecimiento del PIB de Colombia 2014-2025 (% anual)"
      description={`Variación anual del Producto Interno Bruto según DANE. La serie captura tres shocks distintos: la desaceleración por precios del petróleo (2015-2017), la pandemia (2020: -7,2% · rebote 2021: +10,7%) y la desaceleración post-rebote (2023-2025). Promedio de los últimos 12 años: ${promedio}%. Un país "normal" de ingreso medio-alto crece 3-4% al año; Colombia ha estado por debajo de eso en la mayoría del periodo.`}
      source="DANE — Cuentas Nacionales Trimestrales · Boletines PIB IV trimestre 2025 y publicaciones anuales."
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Crecimiento positivo" />
          <LegendItem color={COLORS.rose} label="Contracción (2020)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
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
            domain={[-10, 12]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value > 0 ? "+" : ""}${value.toFixed(1)}%  ·  ${d.gobierno}`,
                "Crecimiento",
              ];
            }}
          />
          <ReferenceLine y={0} stroke="#525252" strokeWidth={1.5} />
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
          <Bar dataKey="crecimiento" radius={[4, 4, 4, 4]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.crecimiento >= 0 ? COLORS.emerald : COLORS.rose}
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="crecimiento"
              position={(props) => (props.value >= 0 ? "top" : "bottom") as any}
              formatter={(v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50/50 p-3 text-xs text-cyan-900 leading-relaxed">
        <strong>El rebote de 2021 no fue mérito de política, fue rebote estadístico.</strong>{" "}
        Colombia cayó 7,2% en 2020 y rebotó 10,7% en 2021 — un patrón mundial en
        economías que salían del confinamiento. El promedio Santos II
        (2014-2018) fue 2,7% anual; Duque (2018-2022, excluyendo pandemia y
        rebote) ronda 2,9%; Petro (2022-2025) promedio 3,1% aritmético — pero
        <strong>2023 fue apenas 0,7%</strong>, uno de los peores años sin
        pandemia del siglo.
      </div>
    </ChartFrame>
  );
}
