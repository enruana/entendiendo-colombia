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

// Deuda pública Gobierno Nacional Central (GNC) como % del PIB
// Fuente: MinHacienda MFMP, DGCPTN
const data = [
  { anio: "2014", deuda: 40.0, gobierno: "Santos I" },
  { anio: "2015", deuda: 45.0, gobierno: "Santos II" },
  { anio: "2016", deuda: 46.8, gobierno: "Santos II" },
  { anio: "2017", deuda: 47.0, gobierno: "Santos II" },
  { anio: "2018", deuda: 50.0, gobierno: "Santos II/Duque" },
  { anio: "2019", deuda: 50.3, gobierno: "Duque" },
  { anio: "2020", deuda: 65.0, gobierno: "Duque · Pandemia" },
  { anio: "2021", deuda: 63.8, gobierno: "Duque · Pierde grado inversión (S&P, Fitch)" },
  { anio: "2022", deuda: 60.1, gobierno: "Duque/Petro" },
  { anio: "2023", deuda: 56.9, gobierno: "Petro" },
  { anio: "2024", deuda: 60.5, gobierno: "Petro" },
  { anio: "2025", deuda: 64.7, gobierno: "Petro · Cláusula de escape" },
];

const anclaDeuda = 55;
const techoDeuda = 71;

export default function DeudaPibBP() {
  return (
    <ChartFrame
      number="Gráfica 1 · Deuda pública"
      title="Deuda del Gobierno Nacional Central como % del PIB (2014-2025)"
      description="Saldo de la deuda bruta del GNC dividido por el PIB nominal del año. Colombia perdió el grado de inversión con S&P y Fitch en 2021 (Duque). En 2020-2021 la deuda subió por la pandemia. En 2023 (Petro) tuvo un descenso técnico por la revaluación del peso (deuda en USD se abarata en pesos), pero en 2024-2025 volvió a subir por déficits altos. En junio 2025 se activó la cláusula de escape de la Regla Fiscal (Ley 2155/2021)."
      source="MinHacienda — Marco Fiscal de Mediano Plazo (MFMP) 2025. Cifras oficiales cerradas hasta 2024; 2025 preliminar."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Deuda / PIB" />
          <LegendItem color={COLORS.amber} label="Techo Regla Fiscal (71%)" shape="line" />
          <LegendItem color={COLORS.emerald} label="Ancla objetivo (55%)" shape="line" />
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
            domain={[30, 75]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toFixed(1)}%  ·  ${d.gobierno}`, "Deuda / PIB"];
            }}
          />
          <ReferenceLine
            y={anclaDeuda}
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "Ancla 55%",
              position: "insideRight",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            y={techoDeuda}
            stroke={COLORS.amber}
            strokeDasharray="4 4"
            strokeWidth={1.5}
            label={{
              value: "Techo 71%",
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
          <Bar dataKey="deuda" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.deuda >= 60
                    ? COLORS.rose
                    : d.deuda >= 50
                      ? COLORS.amber
                      : COLORS.slate
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="deuda"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>La deuda se acerca al techo de la Regla Fiscal.</strong> 64,7% del
        PIB en 2025, contra un techo de 71%. Le queda al próximo gobierno un
        margen de <strong>~6 pp del PIB</strong> antes de romper la regla. Con
        déficits de 6-7% al año, ese margen puede consumirse en 1-2 años. La
        activación de la <strong>cláusula de escape en junio 2025</strong>
        suspende temporalmente la regla hasta 2027 y pospone la corrección
        estructural.
      </div>
    </ChartFrame>
  );
}
