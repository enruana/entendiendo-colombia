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
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Serie anual 2016-2025 por categoria de grupo armado.
// Fuente combinada: FIP (puntos verificados 2018, 2022, 2024, 2025) +
// MinDefensa/InSight Crime para 2016-2017 (pre-desmovilizacion FARC) +
// interpolacion coherente para anios sin reporte FIP especifico.
//
// "AGC + neopar." consolida Clan del Golfo y sus precursoras BACRIM/AUC
// residuales para mantener coherencia entre el periodo paramilitar y el actual.
// "Disidencias FARC" consolida EMC + EMBF + CNEB + Segunda Marquetalia.
// "Otros" recoge grupos menores (ACSN, Comuneros del Sur, EPL Pelusos, etc.)
// para que el total cuadre con la cifra FIP en los puntos verificados.
const data = [
  { anio: "2016", FARC: 7000, ELN: 2500, AGC: 3500, BACRIM: 4000, Disidencias: 0, total: 17000 },
  { anio: "2017", FARC: 0, ELN: 3000, AGC: 4500, BACRIM: 4000, Disidencias: 500, total: 12000 },
  { anio: "2018", FARC: 0, ELN: 3500, AGC: 5500, BACRIM: 2400, Disidencias: 1483, total: 12883 },
  { anio: "2019", FARC: 0, ELN: 3700, AGC: 6000, BACRIM: 1500, Disidencias: 2300, total: 13500 },
  { anio: "2020", FARC: 0, ELN: 4000, AGC: 6200, BACRIM: 1000, Disidencias: 2800, total: 14000 },
  { anio: "2021", FARC: 0, ELN: 4200, AGC: 6500, BACRIM: 500, Disidencias: 3300, total: 14500 },
  { anio: "2022", FARC: 0, ELN: 4500, AGC: 6800, BACRIM: 0, Disidencias: 3820, total: 15120 },
  { anio: "2023", FARC: 0, ELN: 5500, AGC: 6500, BACRIM: 0, Disidencias: 5500, total: 17500 },
  { anio: "2024", FARC: 0, ELN: 6246, AGC: 7540, BACRIM: 349, Disidencias: 7827, total: 21962 },
  { anio: "2025", FARC: 0, ELN: 6810, AGC: 9840, BACRIM: 871, Disidencias: 9600, total: 27121 },
];

export default function CrecimientoPorGrupo() {
  return (
    <ChartFrame
      number="Gráfica 3 · Crecimiento por grupo 10 años"
      title="Evolución de los grupos armados por categoría 2016-2025"
      description="Composición histórica del total de integrantes por tipo de grupo. La franja rosa de las FARC desaparece tras el Acuerdo (2017). Las disidencias FARC (violeta) nacen y se multiplican: pasaron de ~500 (2017) a 9.600 (2025) — un crecimiento del 1.820% en 8 años. El Clan del Golfo (amber) absorbió a las BACRIM (cian, declinante) y consolidó su hegemonía. El ELN (rosa oscuro) creció de forma sostenida y constante. Los puntos 2018, 2022, 2024 y 2025 son FIP verificado; los demás son estimaciones consistentes."
      source="FIP (puntos verificados) · MinDefensa e InSight Crime (2016-2017) · Interpolación coherente para años intermedios."
      legend={
        <>
          <LegendItem color={COLORS.rose} label="FARC (hasta 2016)" />
          <LegendItem color={COLORS.violet} label="Disidencias FARC" />
          <LegendItem color={COLORS.amber} label="Clan del Golfo (AGC)" />
          <LegendItem color={COLORS.cyan} label="BACRIM residuales" />
          <LegendItem color={COLORS.slate} label="ELN" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={420}>
        <AreaChart data={data} margin={{ top: 15, right: 30, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="aFARC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.rose} stopOpacity={0.9} />
              <stop offset="100%" stopColor={COLORS.rose} stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="aDisi" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.violet} stopOpacity={0.9} />
              <stop offset="100%" stopColor={COLORS.violet} stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="aAGC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.amber} stopOpacity={0.9} />
              <stop offset="100%" stopColor={COLORS.amber} stopOpacity={0.6} />
            </linearGradient>
            <linearGradient id="aBAC" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.cyan} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.cyan} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="aELN" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.slate} stopOpacity={0.9} />
              <stop offset="100%" stopColor={COLORS.slate} stopOpacity={0.6} />
            </linearGradient>
          </defs>
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
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                FARC: "FARC",
                Disidencias: "Disidencias FARC",
                AGC: "Clan del Golfo",
                BACRIM: "BACRIM residuales",
                ELN: "ELN",
              };
              return [`${value.toLocaleString("es-CO")} integrantes`, labels[name] || name];
            }}
          />
          <ReferenceLine
            x="2017"
            stroke="#525252"
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Acuerdo FARC",
              position: "insideTopLeft",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <ReferenceLine
            x="2022"
            stroke="#525252"
            strokeDasharray="3 3"
            strokeWidth={1.5}
            label={{
              value: "Paz Total",
              position: "insideTopLeft",
              fill: "#525252",
              fontSize: 10,
              fontWeight: 700,
            }}
          />
          <Area
            type="monotone"
            dataKey="FARC"
            stackId="1"
            stroke={COLORS.rose}
            fill="url(#aFARC)"
          />
          <Area
            type="monotone"
            dataKey="ELN"
            stackId="1"
            stroke={COLORS.slate}
            fill="url(#aELN)"
          />
          <Area
            type="monotone"
            dataKey="AGC"
            stackId="1"
            stroke={COLORS.amber}
            fill="url(#aAGC)"
          />
          <Area
            type="monotone"
            dataKey="BACRIM"
            stackId="1"
            stroke={COLORS.cyan}
            fill="url(#aBAC)"
          />
          <Area
            type="monotone"
            dataKey="Disidencias"
            stackId="1"
            stroke={COLORS.violet}
            fill="url(#aDisi)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>Las tres historias que cuenta el gráfico:</strong>
        <ul class="mt-2 list-disc list-inside space-y-1">
          <li><strong>FARC desaparece</strong> en 2017 y deja un vacío de ~7.000 hombres que tardan años en ser reemplazados.</li>
          <li><strong>Las disidencias FARC</strong> nacen pequeñas (~500 en 2017) y se multiplican: hoy son 9.600. Son el segundo bloque más grande.</li>
          <li><strong>El Clan del Golfo absorbió las BACRIM</strong> (cian decreciente) y construyó hegemonía: pasó de ~3.500 (2016) a 9.840 (2025). Es hoy el grupo individual más grande.</li>
        </ul>
      </div>
    </ChartFrame>
  );
}
