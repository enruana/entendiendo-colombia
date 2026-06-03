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
  Cell,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Serie historica anual del total de integrantes en grupos armados ilegales
// 2016-2017: estimacion multi-fuente combinada (MinDefensa + InSight Crime + FIP)
//   pre-Acuerdo (2016): FARC ~7.000 + ELN ~2.500 + AGC ~3.500 + BACRIM ~4.000 = ~17.000
//   post-Acuerdo (2017): ELN ~3.000 + AGC ~4.000 + BACRIM ~4.500 + primeras disidencias ~500 = ~12.000
// 2018, 2022, 2024 (Dic), 2025 (Jul), 2025 (Dic): FIP oficial
// 2019, 2020, 2021, 2023: interpolacion consistente con tendencia FIP
const data = [
  { fecha: "2016", total: 17000, evento: "Pre-Acuerdo de Paz FARC", fuente: "Estimación multi-fuente" },
  { fecha: "2017", total: 12000, evento: "FARC se desmoviliza (14.107 firmantes)", fuente: "Estimación multi-fuente" },
  { fecha: "2018", total: 12883, evento: "Posconflicto año 1", fuente: "FIP oficial" },
  { fecha: "2019", total: 13500, evento: "Auge de las primeras disidencias", fuente: "Interpolación" },
  { fecha: "2020", total: 14000, evento: "Pandemia: el conflicto no se detiene", fuente: "Interpolación" },
  { fecha: "2021", total: 14500, evento: "Asesinato de líderes sociales en aumento", fuente: "Interpolación" },
  { fecha: "2022", total: 15120, evento: "Cambio de gobierno · Inicio Paz Total", fuente: "FIP oficial" },
  { fecha: "2023", total: 17500, evento: "Ceses al fuego permiten consolidación", fuente: "Interpolación" },
  { fecha: "2024", total: 21962, evento: "Crecimiento acelerado del Clan del Golfo", fuente: "FIP oficial (Dic)" },
  { fecha: "2025-07", total: 25278, evento: "+15% en 7 meses", fuente: "FIP oficial (Jul)" },
  { fecha: "2025-12", total: 27121, evento: "Máximo histórico", fuente: "FIP oficial (Dic)" },
];

export default function EvolucionTotalGrupos() {
  return (
    <ChartFrame
      number="Gráfica 2 · Evolución histórica"
      title="Crecimiento del total de integrantes en grupos armados 2016-2026"
      description="Serie de 11 años del total estimado de integrantes (combatientes en armas + redes de apoyo). Los puntos en rosa son cifras oficiales de la FIP con metodología consistente desde 2018. Los puntos pre-2018 son estimaciones combinadas (MinDefensa + InSight Crime + FIP) — la desmovilización masiva FARC de 2017 introduce una discontinuidad metodológica. Los puntos intermedios (2019, 2020, 2021, 2023) son interpolaciones consistentes con la tendencia reportada."
      source="FIP — Informes anuales 2018-2026 · MinDefensa e InSight Crime para datos pre-2018 · Interpolación para años sin reporte específico."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Cifra FIP oficial" />
          <LegendItem color={COLORS.slate} label="Estimación multi-fuente / Interpolación" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={data} margin={{ top: 40, right: 30, left: 0, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="fecha"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-30}
            textAnchor="end"
            height={55}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            domain={[10000, 30000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `${value.toLocaleString("es-CO")} integrantes`,
                `${d.fuente}  ·  ${d.evento}`,
              ];
            }}
          />
          <ReferenceLine
            x="2017"
            stroke={COLORS.slate}
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Acuerdo FARC",
              position: "top",
              fill: COLORS.slate,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x="2022"
            stroke={COLORS.slate}
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Paz Total",
              position: "top",
              fill: COLORS.slate,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Bar
            dataKey="total"
            fillOpacity={0.25}
            radius={[4, 4, 0, 0]}
          >
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.fuente.startsWith("FIP oficial") ? COLORS.rose : COLORS.slate}
              />
            ))}
          </Bar>
          <Line
            type="monotone"
            dataKey="total"
            stroke={COLORS.rose}
            strokeWidth={2.5}
            dot={(props) => {
              const d = data[props.index];
              const isFIP = d.fuente.startsWith("FIP oficial");
              return (
                <circle
                  cx={props.cx}
                  cy={props.cy}
                  r={isFIP ? 6 : 4}
                  fill={isFIP ? COLORS.rose : "#fff"}
                  stroke={isFIP ? COLORS.rose : COLORS.slate}
                  strokeWidth={2}
                />
              );
            }}
            activeDot={{ r: 8 }}
          >
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Line>
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 leading-relaxed">
        <strong>De ~17.000 (2016) a 27.121 (2025): +60% en una década.</strong> La
        curva muestra tres fases: <strong>(1)</strong> caída de 2016 a 2017 por la
        desmovilización de 14.107 firmantes FARC; <strong>(2)</strong> meseta de 2018
        a 2022 alrededor de 13-15K, con el Acuerdo en implementación; y
        <strong> (3)</strong> aceleración brusca desde 2023 — coincidente con los
        ceses al fuego de la Paz Total, que algunos analistas asocian con la
        consolidación territorial sin combate. El nivel actual ya superó al
        pre-Acuerdo.
      </div>
    </ChartFrame>
  );
}
