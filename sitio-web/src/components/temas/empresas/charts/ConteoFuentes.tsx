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
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Tres fuentes oficiales, tres conteos distintos.
// Cifras verificadas en informes oficiales y notas de prensa de DANE/Confecamaras.
const data = [
  {
    fuente: "RUES",
    descripcion: "Registro mercantil (Confecamaras)",
    valor: 1739,
    unidad: "Empresas registradas",
    anio: 2024,
    color: COLORS.violet,
  },
  {
    fuente: "DIAN — RUT",
    descripcion: "Inscritos al sistema tributario",
    valor: 6800,
    unidad: "Personas y entidades en RUT",
    anio: 2024,
    color: COLORS.indigo,
  },
  {
    fuente: "DANE — CNE",
    descripcion: "Conteo de unidades economicas",
    valor: 2580,
    unidad: "Establecimientos economicos",
    anio: 2021,
    color: COLORS.amber,
  },
];

export default function ConteoFuentes() {
  return (
    <ChartFrame
      number="Gráfica 1 · El conteo depende de la fuente"
      title="Tres cifras oficiales, tres realidades distintas"
      description="RUES cuenta solo empresas con registro mercantil. RUT incluye millones de personas naturales obligadas a declarar. El CNE de DANE conto establecimientos visibles en territorio, incluyendo informales. Ninguna esta mal, simplemente miden universos distintos."
      source="Confecamaras (RUES 2024) + DIAN (RUT 2024 aproximado) + DANE Conteo de Unidades Economicas 2021"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="RUES — registro mercantil" />
          <LegendItem color={COLORS.indigo} label="DIAN — RUT" />
          <LegendItem color={COLORS.amber} label="DANE CNE — establecimientos" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="fuente"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${(v / 1000).toFixed(1)}M`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name, props: { payload?: { unidad?: string; anio?: number } }) => {
              const millones = (v / 1000).toFixed(2);
              return [
                `${millones} M (${v.toLocaleString("es-CO")} mil) · ${props.payload?.unidad ?? ""} · ${props.payload?.anio ?? ""}`,
                "Total",
              ];
            }}
          />
          <Bar dataKey="valor" radius={[8, 8, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
            <LabelList
              dataKey="valor"
              position="top"
              formatter={(v: number) => `${(v / 1000).toFixed(1)}M`}
              style={{ fontSize: 13, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs text-neutral-700 leading-relaxed">
        <strong>Lectura:</strong> la cifra de DIAN incluye personas naturales obligadas
        a declarar renta, IVA o retencion; no todas son "empresas" en sentido estricto.
        RUES es el conteo mas usado para hablar de tejido empresarial formal. CNE captura
        establecimientos visibles, incluyendo informales sin registro mercantil. La
        diferencia entre los tres no es un error, es una pregunta distinta.
      </div>
    </ChartFrame>
  );
}
