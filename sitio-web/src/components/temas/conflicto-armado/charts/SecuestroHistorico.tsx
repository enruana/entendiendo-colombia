import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import ChartFrame from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Secuestros anuales reportados en Colombia 1990-2024
// Fuente: CNMH, Fondelibertad, Fundacion Pais Libre, MinDefensa
const data = [
  { anio: 1990, secuestros: 1308 },
  { anio: 1992, secuestros: 1717 },
  { anio: 1994, secuestros: 1416 },
  { anio: 1996, secuestros: 1503 },
  { anio: 1998, secuestros: 2945 },
  { anio: 2000, secuestros: 3572 },
  { anio: 2002, secuestros: 2989 },
  { anio: 2004, secuestros: 1440 },
  { anio: 2006, secuestros: 687 },
  { anio: 2008, secuestros: 437 },
  { anio: 2010, secuestros: 282 },
  { anio: 2012, secuestros: 305 },
  { anio: 2014, secuestros: 288 },
  { anio: 2016, secuestros: 205 },
  { anio: 2018, secuestros: 174 },
  { anio: 2020, secuestros: 91 },
  { anio: 2022, secuestros: 175 },
  { anio: 2024, secuestros: 290 },
];

export default function SecuestroHistorico() {
  return (
    <ChartFrame
      number="Gráfica 3 · Secuestro"
      title="Secuestros anuales en Colombia 1990-2024"
      description="Casos de secuestro reportados según el Centro Nacional de Memoria Histórica, Fondelibertad y MinDefensa. La curva muestra el ascenso de los años 90, el pico histórico de 3.572 secuestros en el año 2000, y la caída sostenida desde la Política de Seguridad Democrática (2002). Hoy el secuestro persiste — y volvió a crecer en 2022-2024 — pero a niveles muy lejanos del pico. La cifra acumulada de las cuatro décadas supera los 39.000 casos."
      source="CNMH · Fondelibertad · Fundación País Libre · MinDefensa. Datos compilados para el período 1990-2024."
    >
      <ResponsiveContainer width="100%" height={340}>
        <AreaChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="aSec" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.rose} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.rose} stopOpacity={0.2} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            interval={1}
            angle={-30}
            textAnchor="end"
            height={45}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => v.toLocaleString("es-CO")}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number) => [
              `${value.toLocaleString("es-CO")} secuestros`,
              "",
            ]}
          />
          <ReferenceLine
            x={2000}
            stroke={COLORS.slate}
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Pico (3.572)",
              position: "top",
              fill: COLORS.slate,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x={2002}
            stroke={COLORS.slate}
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Seguridad Democrática",
              position: "insideTopRight",
              fill: COLORS.slate,
              fontSize: 9,
              fontWeight: 700,
            }}
          />
          <Area
            type="monotone"
            dataKey="secuestros"
            stroke={COLORS.rose}
            strokeWidth={2.5}
            fill="url(#aSec)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 leading-relaxed">
        <strong>De 3.572 (2000) a menos de 200 (2018-2020): −95%.</strong> La caída
        es uno de los logros más concretos de la política de seguridad de las
        últimas dos décadas. El mínimo histórico fue 91 casos en 2020 (efecto
        pandemia + tendencia previa). Desde 2022 hay un rebote moderado: 175 (2022)
        y 290 (2024), en parte por nuevas modalidades urbanas (paseo millonario,
        secuestro express para extorsión) y por la actividad del ELN en Catatumbo
        y Arauca.
      </div>
    </ChartFrame>
  );
}
