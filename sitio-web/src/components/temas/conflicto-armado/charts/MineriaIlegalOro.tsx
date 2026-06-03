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

// Hectareas con Evidencias de Explotacion de Oro de Aluvion (EVOA)
// Fuente: UNODC Colombia - Sistema EVOA por percepcion remota
const data = [
  { anio: 2014, hectareas: 79000, nota: "Primer monitoreo" },
  { anio: 2016, hectareas: 83620, nota: "Inicio serie EVOA" },
  { anio: 2018, hectareas: 92046, nota: "+10% vs 2016" },
  { anio: 2019, hectareas: 98000, nota: "Cerca de 100K ha" },
  { anio: 2020, hectareas: 100752, nota: "Máximo histórico" },
  { anio: 2021, hectareas: 98567, nota: "Leve descenso" },
  { anio: 2022, hectareas: 94733, nota: "Tendencia a estabilización" },
];

export default function MineriaIlegalOro() {
  return (
    <ChartFrame
      number="Gráfica 1 · Minería ilegal"
      title="Hectáreas con evidencia de explotación de oro de aluvión (EVOA)"
      description="Monitoreo satelital del UNODC sobre la huella física de la minería de oro de aluvión en Colombia. El 57% se realiza por fuera de cualquier figura de ley (sin título minero ni licencia ambiental). El 76% se concentra en Chocó (~40%) y Antioquia. La cifra creció 27% entre 2014 y 2020. Desde entonces se estabilizó alrededor de las 95-100 mil hectáreas, en parte por mayor control y en parte por saturación de zonas explotables."
      source="UNODC Colombia · Sistema EVOA (Evidencias de Explotación de Oro de Aluvión), monitoreo por percepción remota 2014-2022."
    >
      <ResponsiveContainer width="100%" height={320}>
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
            domain={[60000, 110000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [`${value.toLocaleString("es-CO")} hectáreas · ${d.nota}`, ""];
            }}
          />
          <Bar dataKey="hectareas" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell
                key={i}
                fill={d.anio === 2020 ? COLORS.amber : COLORS.slate}
                fillOpacity={d.anio === 2020 ? 0.95 : 0.6}
              />
            ))}
            <LabelList
              dataKey="hectareas"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(1)}K`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>+27% en 6 años (2014-2020).</strong> La minería de oro de aluvión
        ilegal se expandió rápido entre 2014 y 2020 y se estabilizó alrededor de
        las 95-100K hectáreas. Pero esta cifra solo mide la huella visible desde
        satélite — no incluye minería subterránea ni minería de socavón. El valor
        económico (~$91 billones de pesos al año) tampoco se desprende
        directamente de las hectáreas: depende del precio internacional del oro.
      </div>
    </ChartFrame>
  );
}
