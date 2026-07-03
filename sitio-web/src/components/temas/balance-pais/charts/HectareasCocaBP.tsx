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

// Hectáreas de coca cultivadas según UNODC SIMCI
// Consistente con el chart HectareasCoca del tema conflicto-armado
const data = [
  { anio: "2014", hectareas: 69000, gobierno: "Santos I" },
  { anio: "2015", hectareas: 96000, gobierno: "Santos II" },
  { anio: "2016", hectareas: 146000, gobierno: "Santos II" },
  { anio: "2017", hectareas: 171000, gobierno: "Santos II" },
  { anio: "2018", hectareas: 169000, gobierno: "Santos II/Duque" },
  { anio: "2019", hectareas: 154000, gobierno: "Duque" },
  { anio: "2020", hectareas: 143000, gobierno: "Duque" },
  { anio: "2021", hectareas: 204000, gobierno: "Duque" },
  { anio: "2022", hectareas: 230000, gobierno: "Duque/Petro" },
  { anio: "2023", hectareas: 253000, gobierno: "Petro" },
  { anio: "2024", hectareas: 262000, gobierno: "Petro · Récord" },
];

export default function HectareasCocaBP() {
  return (
    <ChartFrame
      number="Gráfica 3 · Cultivos de coca"
      title="Hectáreas de coca cultivada 2014-2024 (UNODC SIMCI)"
      description="Extensión de cultivos ilícitos monitoreada por satélite según el UNODC. Colombia es el mayor productor mundial de coca. La curva pasó de 48.000 ha (2013, mínimo histórico) a 262.000 ha (2024, máximo histórico). Cada gobierno desde 2013 recibió más coca de la que dejó su antecesor, salvo el breve descenso de Duque 2019-2020. La política antinarcóticos ha sido incapaz de contener la expansión — factor central de la financiación de grupos armados y del deterioro de la seguridad."
      source="UNODC — Sistema Integrado de Monitoreo de Cultivos Ilícitos (SIMCI). Cifras publicadas oct 2025 (para 2024)."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Hectáreas de coca" />
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
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            domain={[0, 280000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value.toLocaleString("es-CO")} ha  ·  ${d.gobierno}`,
                "Cultivos",
              ];
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
          <Bar dataKey="hectareas" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.hectareas >= 240000
                    ? COLORS.rose
                    : d.hectareas >= 180000
                      ? COLORS.amber
                      : COLORS.slate
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="hectareas"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>2024 marcó el récord histórico.</strong> 262.000 hectáreas
        cultivadas — 3,8 veces el mínimo de 2013 (48.000 ha). El
        <strong> Programa Nacional Integral de Sustitución (PNIS)</strong>
        creado por el Acuerdo Final apenas ha cubierto una fracción de las
        familias cocaleras. Bajo Petro se privilegió la sustitución
        voluntaria sobre la erradicación forzosa: aumentó la producción, no
        se redujo. Esto financia grupos armados y sostiene la violencia rural.
      </div>
    </ChartFrame>
  );
}
