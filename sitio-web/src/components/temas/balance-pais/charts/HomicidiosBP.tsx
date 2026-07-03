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

// Homicidios totales y tasa por 100 mil habitantes según MinDefensa / Medicina Legal
// Cifras oficiales cerradas hasta 2024; 2025 preliminar
const data = [
  { anio: "2014", homicidios: 12806, tasa: 26.5, gobierno: "Santos I" },
  { anio: "2015", homicidios: 12782, tasa: 26.1, gobierno: "Santos II" },
  { anio: "2016", homicidios: 12262, tasa: 24.8, gobierno: "Santos II" },
  { anio: "2017", homicidios: 12124, tasa: 24.4, gobierno: "Santos II" },
  { anio: "2018", homicidios: 12130, tasa: 24.3, gobierno: "Santos II/Duque" },
  { anio: "2019", homicidios: 12825, tasa: 25.3, gobierno: "Duque" },
  { anio: "2020", homicidios: 12017, tasa: 23.4, gobierno: "Duque · Pandemia" },
  { anio: "2021", homicidios: 14170, tasa: 27.5, gobierno: "Duque" },
  { anio: "2022", homicidios: 14047, tasa: 27.1, gobierno: "Duque/Petro" },
  { anio: "2023", homicidios: 13342, tasa: 25.6, gobierno: "Petro" },
  { anio: "2024", homicidios: 13540, tasa: 25.8, gobierno: "Petro" },
  { anio: "2025", homicidios: 14100, tasa: 26.7, gobierno: "Petro · Repunte" },
];

export default function HomicidiosBP() {
  return (
    <ChartFrame
      number="Gráfica 1 · Homicidios"
      title="Homicidios totales y tasa por 100 mil habitantes 2014-2025"
      description="El homicidio es el indicador más grave de seguridad. La tasa se calcula por 100 mil habitantes para permitir comparaciones entre años y países. Colombia estuvo entre 23 y 27 por 100 mil en los últimos 12 años. Por referencia: la OMS considera 'epidemia' un nivel superior a 10; el promedio latinoamericano ronda 22; el europeo, ~3. La disminución que hubo entre 2016-2020 se revirtió desde 2021, y en 2025 los homicidios crecieron por sexto trimestre consecutivo."
      source="Policía Nacional / Sijín · Medicina Legal · Balance MinDefensa. Cifras 2024 cerradas, 2025 preliminares (dic)."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Homicidios totales" />
          <LegendItem color={COLORS.slate} label="Tasa por 100 mil hab." shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <ComposedChart data={data} margin={{ top: 30, right: 30, left: 0, bottom: 30 }}>
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
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            domain={[10000, 16000]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => v.toString()}
            domain={[20, 30]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string, item) => {
              const d = item.payload as (typeof data)[number];
              if (name === "homicidios")
                return [
                  `${value.toLocaleString("es-CO")}  ·  ${d.gobierno}`,
                  "Casos totales",
                ];
              return [`${value.toFixed(1)} por 100K`, "Tasa"];
            }}
          />
          <ReferenceLine
            x="2018"
            yAxisId="left"
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
            yAxisId="left"
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
          <Bar yAxisId="left" dataKey="homicidios" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.homicidios >= 14000
                    ? COLORS.rose
                    : d.homicidios >= 12800
                      ? COLORS.amber
                      : COLORS.slate
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="homicidios"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
              style={{ fontSize: 9, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="tasa"
            stroke={COLORS.slate}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.slate }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>El repunte de 2025 preocupa.</strong> Después de la reducción de
        14.170 (2021) a 13.342 (2023), los homicidios volvieron a subir a
        13.540 (2024) y ~14.100 (2025). La tasa por 100 mil se mantiene por
        encima de 25 — nivel de "epidemia" según OMS. El proyecto de
        <strong>Paz Total</strong> ha coincidido con crecimiento sostenido de
        grupos armados (ver <a href="/temas/conflicto-armado/">tema conflicto armado</a>)
        y consolidación territorial de estructuras criminales.
      </div>
    </ChartFrame>
  );
}
