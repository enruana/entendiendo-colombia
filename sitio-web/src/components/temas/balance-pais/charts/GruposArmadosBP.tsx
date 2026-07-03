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

// Integrantes de grupos armados ilegales según FIP y otras fuentes
// Consistente con el chart EvolucionTotalGrupos del tema conflicto-armado
const data = [
  { anio: "2016", integrantes: 17000, gobierno: "Santos II · Pre-Acuerdo" },
  { anio: "2017", integrantes: 12000, gobierno: "Santos II · Acuerdo FARC" },
  { anio: "2018", integrantes: 12883, gobierno: "Santos II/Duque" },
  { anio: "2019", integrantes: 13500, gobierno: "Duque" },
  { anio: "2020", integrantes: 14000, gobierno: "Duque · Pandemia" },
  { anio: "2021", integrantes: 14500, gobierno: "Duque" },
  { anio: "2022", integrantes: 15120, gobierno: "Duque/Petro · Paz Total" },
  { anio: "2023", integrantes: 17500, gobierno: "Petro" },
  { anio: "2024", integrantes: 21962, gobierno: "Petro" },
  { anio: "2025", integrantes: 27121, gobierno: "Petro · Máximo histórico" },
];

export default function GruposArmadosBP() {
  return (
    <ChartFrame
      number="Gráfica 2 · Grupos armados"
      title="Integrantes de grupos armados ilegales 2016-2025"
      description="Total estimado de integrantes en las estructuras armadas ilegales: disidencias de las FARC (EMC, EMBF, CNEB, Segunda Marquetalia), ELN, Clan del Golfo (AGC) y otros. Bajo el Acuerdo Final de 2016, las FARC dejaron las armas y el total cayó a mínimo histórico en 2017-2018. Desde 2019 los grupos vuelven a crecer, y bajo la Paz Total (2022-) se aceleró: pasaron de 15.120 en 2022 a 27.121 en 2025 — un +79% en 3 años."
      source="Fundación Ideas para la Paz (FIP), MinDefensa, InSight Crime, Indepaz. Ver tema Conflicto Armado para desagregación por grupo."
      legend={
        <>
          <LegendItem color={COLORS.slate} label="Integrantes totales" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
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
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            domain={[0, 30000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value.toLocaleString("es-CO")}  ·  ${d.gobierno}`,
                "Integrantes",
              ];
            }}
          />
          <ReferenceLine
            x="2017"
            stroke={COLORS.emerald}
            strokeDasharray="4 4"
            strokeWidth={2}
            label={{
              value: "Acuerdo FARC",
              position: "insideTop",
              fill: COLORS.emerald,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x="2022"
            stroke={COLORS.rose}
            strokeDasharray="4 4"
            strokeWidth={2}
            label={{
              value: "Paz Total",
              position: "insideTop",
              fill: COLORS.rose,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar dataKey="integrantes" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.integrantes >= 20000
                    ? COLORS.rose
                    : d.integrantes >= 15000
                      ? COLORS.amber
                      : COLORS.emerald
                }
                fillOpacity={0.85}
              />
            ))}
            <LabelList
              dataKey="integrantes"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>Los grupos armados casi se duplicaron bajo Petro.</strong>
        De 15.120 (2022) a 27.121 (2025): +79%. La <strong>Paz Total</strong>
        buscaba negociar simultáneamente con múltiples grupos y grupos criminales.
        Los ceses al fuego intermitentes coincidieron con expansión territorial
        y reclutamiento. Ninguna mesa fructificó en un acuerdo integral. El
        próximo gobierno recibe un mapa de grupos armados
        <strong> más complejo que el de 2022</strong>.
      </div>
    </ChartFrame>
  );
}
