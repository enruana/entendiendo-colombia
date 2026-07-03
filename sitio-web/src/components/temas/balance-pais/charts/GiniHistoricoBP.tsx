import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Coeficiente Gini de Colombia 2014-2025 vs referencias internacionales
const data = [
  { anio: "2014", gini: 0.538, gobierno: "Santos I" },
  { anio: "2015", gini: 0.522, gobierno: "Santos II" },
  { anio: "2016", gini: 0.517, gobierno: "Santos II" },
  { anio: "2017", gini: 0.508, gobierno: "Santos II · Mejor de la serie" },
  { anio: "2018", gini: 0.517, gobierno: "Santos II/Duque" },
  { anio: "2019", gini: 0.526, gobierno: "Duque" },
  { anio: "2020", gini: 0.544, gobierno: "Duque · Pandemia" },
  { anio: "2021", gini: 0.523, gobierno: "Duque" },
  { anio: "2022", gini: 0.556, gobierno: "Duque/Petro" },
  { anio: "2023", gini: 0.553, gobierno: "Petro" },
  { anio: "2024", gini: 0.551, gobierno: "Petro" },
  { anio: "2025", gini: 0.531, gobierno: "Petro" },
];

// Referencias internacionales
const REF_OCDE = 0.315;
const REF_URUGUAY = 0.403;
const REF_CHILE = 0.442;
const REF_BRASIL = 0.518;

export default function GiniHistoricoBP() {
  return (
    <ChartFrame
      number="Gráfica 2 · Desigualdad (GINI)"
      title="Coeficiente Gini de Colombia 2014-2025"
      description="El índice Gini mide la desigualdad de ingresos. 0 = igualdad perfecta, 1 = un solo hogar concentra todo. Colombia es uno de los países más desiguales del mundo — comparable con Sudáfrica y superior a Brasil. La caída del Gini bajo Petro (0,556 → 0,531) es real y positiva, pero el nivel actual sigue siendo muy alto. El mejor Gini de la serie fue 0,508 en 2017 (Santos II)."
      source="DANE — Pobreza Monetaria y Desigualdad 2025. OCDE Income Distribution Database. Banco Mundial WDI."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Colombia" shape="line" />
          <LegendItem color={COLORS.slate} label="Referencias internacionales" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <LineChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
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
            tickFormatter={(v) => v.toFixed(2)}
            domain={[0.28, 0.6]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(3)}  ·  ${d.gobierno}`, "Gini"];
            }}
          />
          <ReferenceLine
            y={REF_OCDE}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            label={{
              value: "OCDE ~0,315",
              position: "insideRight",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            y={REF_URUGUAY}
            stroke={COLORS.cyan}
            strokeDasharray="4 4"
            label={{
              value: "Uruguay 0,403",
              position: "insideRight",
              fill: COLORS.cyan,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            y={REF_CHILE}
            stroke={COLORS.amber}
            strokeDasharray="4 4"
            label={{
              value: "Chile 0,442",
              position: "insideRight",
              fill: COLORS.amber,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            y={REF_BRASIL}
            stroke={COLORS.slate}
            strokeDasharray="4 4"
            label={{
              value: "Brasil 0,518",
              position: "insideRight",
              fill: COLORS.slate,
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
          <Line
            type="monotone"
            dataKey="gini"
            stroke={COLORS.rose}
            strokeWidth={3}
            dot={{ r: 5, fill: COLORS.rose }}
            activeDot={{ r: 7 }}
          />
          <ReferenceDot x="2017" y={0.508} r={7} fill={COLORS.emerald} stroke="#fff" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>Colombia es uno de los países más desiguales del mundo.</strong>
        El Gini de 0,531 (2025) es mayor que Brasil (~0,52), Chile (~0,44),
        Uruguay (~0,40) — nuestros pares latinoamericanos. La OCDE promedio
        ronda 0,32. Bajo Petro cayó del pico de 0,556 al 0,531 (mejora de
        0,025). Pero el <strong>mejor Gini de Colombia desde que se mide es
        0,508 en 2017 (Santos II)</strong>. La reducción actual apenas
        recupera niveles ya alcanzados hace 8 años.
      </div>
    </ChartFrame>
  );
}
