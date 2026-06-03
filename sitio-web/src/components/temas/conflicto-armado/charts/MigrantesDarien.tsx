import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Cell,
} from "recharts";
import ChartFrame from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Migrantes cruzando la selva del Darien Colombia-Panama
// Fuente: Migracion Panama + Defensoria del Pueblo Colombia + ACNUR + IOM
const data = [
  { anio: 2016, migrantes: 30000, evento: "" },
  { anio: 2018, migrantes: 9220, evento: "" },
  { anio: 2019, migrantes: 23968, evento: "" },
  { anio: 2020, migrantes: 8594, evento: "Pandemia" },
  { anio: 2021, migrantes: 133726, evento: "Repunte post-pandemia" },
  { anio: 2022, migrantes: 248284, evento: "" },
  { anio: 2023, migrantes: 520085, evento: "Récord histórico" },
  { anio: 2024, migrantes: 302203, evento: "Endurecimiento de Panamá" },
  { anio: 2025, migrantes: 3091, evento: "Cierre frontera Trump 2 + Mulino" },
];

export default function MigrantesDarien() {
  return (
    <ChartFrame
      number="Gráfica 4 · Migrantes Darién"
      title="Migrantes cruzando el Tapón del Darién 2016-2025"
      description="Personas migrantes que atravesaron la selva del Darién entre Colombia (Necoclí) y Panamá camino a Centroamérica y Estados Unidos. La cifra explotó en 2021 con el éxodo venezolano y haitiano y alcanzó el récord histórico de 520.085 personas en 2023. El descenso de 2024 y la caída del 99% en 2025 reflejan el endurecimiento de la política migratoria del presidente panameño Mulino y de Trump en EE.UU. Los grupos armados en el lado colombiano (AGC) cobran peaje por permitir el paso."
      source="Servicio Nacional de Migración de Panamá · Defensoría del Pueblo Colombia · ACNUR · OIM."
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              const evento = d.evento ? ` · ${d.evento}` : "";
              return [
                `${value.toLocaleString("es-CO")} personas${evento}`,
                "Cruce Darién",
              ];
            }}
          />
          <Bar dataKey="migrantes" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={
                  d.anio === 2023
                    ? COLORS.rose
                    : d.anio === 2025
                      ? COLORS.emerald
                      : COLORS.violet
                }
                fillOpacity={d.anio === 2023 ? 0.95 : 0.7}
              />
            ))}
            <LabelList
              dataKey="migrantes"
              position="top"
              formatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v.toString()
              }
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>520 mil personas en 2023 — luego caída del 99%.</strong> El Darién
        es la trocha selvática más peligrosa del continente: 100 km sin Estado, con
        guías, cobros del Clan del Golfo y altísima mortalidad. El presidente
        panameño Mulino (electo en 2024) endureció el control y, con la segunda
        administración Trump y los acuerdos con Centroamérica, la ruta colapsó en
        2025. Lo más probable: los migrantes se desviaron por otras rutas más
        peligrosas, no que dejaron de migrar.
      </div>
    </ChartFrame>
  );
}
