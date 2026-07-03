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

// Recaudo tributario DIAN como % del PIB
// Fuente: DIAN estadísticas de recaudo + DANE PIB corriente
const data = [
  { anio: "2014", recaudo: 14.3 },
  { anio: "2015", recaudo: 14.5 },
  { anio: "2016", recaudo: 14.6 },
  { anio: "2017", recaudo: 14.9 },
  { anio: "2018", recaudo: 14.1 },
  { anio: "2019", recaudo: 14.7 },
  { anio: "2020", recaudo: 13.7 },
  { anio: "2021", recaudo: 15.3 },
  { anio: "2022", recaudo: 16.1 },
  { anio: "2023", recaudo: 17.6 },
  { anio: "2024", recaudo: 15.8 },
  { anio: "2025", recaudo: 15.9 },
];

const promedioOCDE = 34;
const promedioAL = 22;

export default function RecaudoTributarioPib() {
  return (
    <ChartFrame
      number="Gráfica 3 · Recaudo tributario"
      title="Recaudo DIAN como % del PIB 2014-2025"
      description="Ingresos tributarios administrados por la DIAN (renta, IVA, GMF, aranceles) sobre el PIB nominal. Colombia recauda ~16% del PIB por vía nacional. Sumando tributos territoriales y parafiscales, el total es ~20%. El promedio OCDE es 34%; el latinoamericano ~22%. La caída del recaudo/PIB en 2024-2025 se explica por menor recaudo por renta corporativa (tras la reforma tributaria de 2022 que subió tarifa) y por débil crecimiento del PIB."
      source="DIAN — Estadísticas de recaudo por tipo de impuesto. DANE PIB corriente. Promedios OCDE y CEPAL para referencia."
      legend={
        <>
          <LegendItem color={COLORS.cyan} label="Recaudo DIAN / PIB" />
          <LegendItem color={COLORS.emerald} label="Promedio OCDE (34%)" shape="line" />
          <LegendItem color={COLORS.amber} label="Promedio A. Latina (22%)" shape="line" />
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
            domain={[10, 36]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [`${value.toFixed(1)}% del PIB`, "Recaudo DIAN"]}
          />
          <ReferenceLine
            y={promedioOCDE}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "OCDE 34%",
              position: "insideRight",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            y={promedioAL}
            stroke={COLORS.amber}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "A. Latina 22%",
              position: "insideRight",
              fill: COLORS.amber,
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
          <Bar dataKey="recaudo" fill={COLORS.cyan} fillOpacity={0.85} radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="recaudo"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="recaudo"
            stroke={COLORS.slate}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50/50 p-3 text-xs text-cyan-900 leading-relaxed">
        <strong>Colombia recauda menos de la mitad que la OCDE.</strong> El pico
        reciente (17,6% en 2023) refleja el efecto de la reforma tributaria de
        2022 (Ley 2277) que subió tarifa corporativa al 35%. Pero desde 2024 el
        recaudo cayó a 15,8%-15,9%: las empresas ajustaron su estructura, el
        crecimiento del PIB fue débil y varios sectores reportaron menores
        utilidades. El <strong>faltante de recaudo respecto al esperado en
        2025 fue $9,5 billones</strong>. El próximo gobierno recibe un sistema
        tributario frágil.
      </div>
    </ChartFrame>
  );
}
