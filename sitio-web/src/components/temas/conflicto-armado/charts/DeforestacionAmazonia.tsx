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
  Cell,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Deforestacion en la Amazonia colombiana - hectareas anuales
// Fuente: IDEAM - Sistema de Monitoreo de Bosques y Carbono
const data = [
  { anio: 2015, hectareas: 56962 },
  { anio: 2016, hectareas: 70074 },
  { anio: 2017, hectareas: 144147, evento: "Pico post-Acuerdo" },
  { anio: 2018, hectareas: 138176 },
  { anio: 2019, hectareas: 98256 },
  { anio: 2020, hectareas: 109302 },
  { anio: 2021, hectareas: 112899 },
  { anio: 2022, hectareas: 71725 },
  { anio: 2023, hectareas: 44274, evento: "Mínimo histórico" },
  { anio: 2024, hectareas: 77124, evento: "Rebote" },
];

export default function DeforestacionAmazonia() {
  return (
    <ChartFrame
      number="Gráfica 5 · Deforestación"
      title="Deforestación anual en la Amazonía colombiana 2015-2024 (hectáreas)"
      description="Pérdida de bosque natural en la región Amazónica colombiana, según el monitoreo del IDEAM. La región concentra ~60% de toda la deforestación nacional. El pico de 144.147 hectáreas en 2017 coincide con el primer año post-Acuerdo: la salida de las FARC dejó vacíos que fueron aprovechados por colonos, ganaderos y grupos ilegales para abrir potreros. La caída récord de 2023 (44.274 ha) se asocia con cesación pactada con disidencias FARC. En 2024 el delito rebotó 74%."
      source="IDEAM · Sistema de Monitoreo de Bosques y Carbono (SMByC) · Ministerio de Ambiente."
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Mínimo histórico (2023)" />
          <LegendItem color={COLORS.rose} label="Pico (2017)" />
          <LegendItem color={COLORS.slate} label="Otros años" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <ComposedChart data={data} margin={{ top: 30, right: 20, left: 0, bottom: 20 }}>
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
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              const evento = d.evento ? ` · ${d.evento}` : "";
              return [`${value.toLocaleString("es-CO")} ha${evento}`, ""];
            }}
          />
          <Bar dataKey="hectareas" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => {
              const color =
                d.anio === 2017
                  ? COLORS.rose
                  : d.anio === 2023
                    ? COLORS.emerald
                    : COLORS.slate;
              return <Cell key={i} fill={color} fillOpacity={0.8} />;
            })}
            <LabelList
              dataKey="hectareas"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(0)}K`}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="hectareas"
            stroke={COLORS.slate}
            strokeWidth={1.5}
            strokeDasharray="4 4"
            dot={false}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-emerald-900 leading-relaxed">
        <strong>La deforestación responde a la presencia o ausencia de grupos
        armados</strong>, pero de manera contraintuitiva: cuando las FARC controlaban
        territorio, prohibían talar (era un castigo grave). Su salida liberó la
        actividad. La caída de 2023 se asocia a un cese de hostilidades con las
        disidencias EMC, que retomaron el control y la prohibición. Cuando ese cese
        se rompió en 2024, la deforestación volvió a subir 74%. La selva está
        atrapada entre el Estado y los grupos armados.
      </div>
    </ChartFrame>
  );
}
