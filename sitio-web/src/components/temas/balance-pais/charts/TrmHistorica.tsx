import {
  ComposedChart,
  Area,
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

// TRM promedio anual (COP por USD) segun BanRep
// Puntos claves incluidos con pico oct 2022 (5089)
const data = [
  { anio: "2014", trm: 2000, evento: "" },
  { anio: "2015", trm: 2741, evento: "Caída petróleo" },
  { anio: "2016", trm: 3053, evento: "" },
  { anio: "2017", trm: 2951, evento: "" },
  { anio: "2018", trm: 2956, evento: "" },
  { anio: "2019", trm: 3281, evento: "" },
  { anio: "2020", trm: 3693, evento: "Pandemia" },
  { anio: "2021", trm: 3743, evento: "" },
  { anio: "2022", trm: 4257, evento: "Pico oct: $5.089" },
  { anio: "2023", trm: 4326, evento: "" },
  { anio: "2024", trm: 4072, evento: "" },
  { anio: "2025", trm: 4151, evento: "" },
  { anio: "2026", trm: 3459, evento: "Junio" },
];

export default function TrmHistorica() {
  return (
    <ChartFrame
      number="Gráfica 3 · Tasa de cambio"
      title="Tasa de cambio peso/dólar 2014-2026 (TRM promedio anual)"
      description="Precio del dólar en pesos según Banco de la República. El peso colombiano se ha devaluado ~73% en 12 años. Colombia está en régimen de flotación desde 1999: el peso responde a la fortaleza global del dólar (Fed), a la balanza de pagos y al carry trade por diferenciales de tasas. Ningún gobierno decide directamente el valor de la moneda, aunque su política fiscal influye en la percepción de riesgo. El pico intradiario fue en noviembre de 2022 con $5.089."
      source="Banco de la República — TRM histórica. Promedios anuales calculados sobre datos diarios."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="TRM promedio anual" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="trmArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.rose} stopOpacity={0.5} />
              <stop offset="100%" stopColor={COLORS.rose} stopOpacity={0.05} />
            </linearGradient>
          </defs>
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
            tickFormatter={(v) => `$${v.toLocaleString("es-CO")}`}
            domain={[1800, 5200]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              const evento = d.evento ? ` · ${d.evento}` : "";
              return [`$${value.toLocaleString("es-CO")}${evento}`, "TRM"];
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
          <Area
            type="monotone"
            dataKey="trm"
            stroke={COLORS.rose}
            strokeWidth={3}
            fill="url(#trmArea)"
          />
          <ReferenceDot
            x="2022"
            y={5089}
            r={6}
            fill={COLORS.rose}
            stroke="#fff"
            strokeWidth={2}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>La devaluación mayor ocurrió antes y BAJO Petro.</strong> El peso se
        devaluó ~52% entre 2014 y julio 2022 (Santos-Duque). Luego llegó al pico
        de $5.089 en noviembre 2022 con Petro. La caída posterior se explica por
        carry trade (BanRep sostuvo tasas muy altas) y por la debilidad relativa
        del dólar frente a otras monedas emergentes. La TRM de junio 2026
        ($3.459) marca la mayor apreciación en 5 años.
      </div>
    </ChartFrame>
  );
}
