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
} from "recharts";
import ChartFrame from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Datos FIP enero 2026 + estimaciones MinDefensa/Indepaz
const grupos = [
  { grupo: "Clan del Golfo (AGC)", integrantes: 9840, crecimiento: 30, tipo: "Crimen org. neoparamilitar" },
  { grupo: "ELN", integrantes: 6810, crecimiento: 9, tipo: "Guerrilla" },
  { grupo: "EMC (disidencia FARC, Mordisco)", integrantes: 4019, crecimiento: 23, tipo: "Disidencia FARC" },
  { grupo: "EMBF (disidencia FARC, Calarcá)", integrantes: 2958, crecimiento: 22, tipo: "Disidencia FARC" },
  { grupo: "CNEB (escisión Segunda Marquetalia)", integrantes: 2089, crecimiento: 25, tipo: "Disidencia FARC" },
  { grupo: "Segunda Marquetalia", integrantes: 534, crecimiento: 15, tipo: "Disidencia FARC" },
];

const total = grupos.reduce((s, g) => s + g.integrantes, 0);

const colorMap: Record<string, string> = {
  "Crimen org. neoparamilitar": COLORS.amber,
  "Guerrilla": COLORS.rose,
  "Disidencia FARC": COLORS.violet,
};

export default function GruposActivos2026() {
  return (
    <ChartFrame
      number="Gráfica 1 · Inicio 2026"
      title="Grupos armados activos en Colombia (estimación FIP, enero 2026)"
      description={`Conteo de integrantes por grupo según la Fundación Ideas para la Paz (FIP). El total — ~${total.toLocaleString("es-CO")} — es la cifra más alta desde el Acuerdo de Paz de 2016. Todos los grupos crecieron en 2025: el Clan del Golfo encabeza el aumento (+30%), seguido por las disidencias. Las cifras son estimaciones de inteligencia y monitoreo civil: pueden subestimar redes urbanas o sobreestimar fuerzas territoriales.`}
      source="Fundación Ideas para la Paz (FIP) — Informe enero 2026. Cifras complementadas con MinDefensa e Indepaz."
    >
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={grupos}
          layout="vertical"
          margin={{ top: 10, right: 80, left: 30, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
          />
          <YAxis
            type="category"
            dataKey="grupo"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={250}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof grupos)[number];
              return [
                `${value.toLocaleString("es-CO")} integrantes (+${d.crecimiento}% vs 2024)`,
                d.tipo,
              ];
            }}
          />
          <Bar dataKey="integrantes" radius={[0, 6, 6, 0]}>
            {grupos.map((g, i) => (
              <Cell key={i} fill={colorMap[g.tipo]} />
            ))}
            <LabelList
              dataKey="integrantes"
              position="right"
              formatter={(v: number) => v.toLocaleString("es-CO")}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-900 leading-relaxed">
        <strong>+23,5% en un año.</strong> De 21.962 integrantes a inicios de 2024 pasamos
        a 27.121 a inicios de 2026 — un aumento de unos 5.000 hombres, equivalente al
        ritmo de un batallón nuevo cada dos meses. La paradoja del posconflicto: la
        seguridad mejoró en muchas regiones, pero los grupos en otras se rearmaron y
        crecieron por la disputa de los corredores cocaleros y mineros.
      </div>
    </ChartFrame>
  );
}
