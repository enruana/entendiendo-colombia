import {
  BarChart,
  Bar,
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

// Resultados PISA de Colombia por área y edición
// La prueba se aplica cada 3 años, pero PISA 2021 se aplazó a 2022 por pandemia
const data = [
  { area: "Matemáticas 2012", puntaje: 376, promedioOcde: 494 },
  { area: "Matemáticas 2015", puntaje: 390, promedioOcde: 490 },
  { area: "Matemáticas 2018", puntaje: 391, promedioOcde: 489 },
  { area: "Matemáticas 2022", puntaje: 383, promedioOcde: 472 },
  { area: "Lectura 2012", puntaje: 403, promedioOcde: 496 },
  { area: "Lectura 2015", puntaje: 425, promedioOcde: 493 },
  { area: "Lectura 2018", puntaje: 412, promedioOcde: 487 },
  { area: "Lectura 2022", puntaje: 411, promedioOcde: 476 },
  { area: "Ciencias 2012", puntaje: 399, promedioOcde: 501 },
  { area: "Ciencias 2015", puntaje: 416, promedioOcde: 493 },
  { area: "Ciencias 2018", puntaje: 413, promedioOcde: 489 },
  { area: "Ciencias 2022", puntaje: 411, promedioOcde: 485 },
];

// Datos resumidos: brecha vs OCDE por área
const brechas = data.map((d) => ({
  area: d.area,
  puntaje: d.puntaje,
  ocde: d.promedioOcde,
  brecha: d.puntaje - d.promedioOcde,
}));

export default function PisaColombiaBP() {
  return (
    <ChartFrame
      number="Gráfica 3 · Resultados PISA"
      title="Colombia en PISA — matemáticas, lectura, ciencias (2012, 2015, 2018, 2022)"
      description="La prueba PISA (Programme for International Student Assessment) evalúa a estudiantes de 15 años en 3 áreas cada 3 años. Colombia participa desde 2006. Los puntajes están estandarizados: 500 es el promedio histórico OCDE. Colombia se ha mantenido consistentemente 80-120 puntos por debajo de la OCDE — equivalente a ~3 años de escolaridad. En 2022 (últimos datos disponibles), Colombia obtuvo 383 en matemáticas, 411 en lectura, 411 en ciencias."
      source="OCDE — PISA 2022 (publicado 2023). ICFES — participación de Colombia. Próxima aplicación: PISA 2025 (resultados 2026)."
      legend={
        <>
          <LegendItem color={COLORS.cyan} label="Colombia" />
          <LegendItem color={COLORS.slate} label="Promedio OCDE" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ top: 20, right: 40, left: 100, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            domain={[300, 550]}
          />
          <YAxis
            type="category"
            dataKey="area"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            width={95}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                puntaje: "Colombia",
                promedioOcde: "Promedio OCDE",
              };
              return [`${value.toFixed(0)} pts`, labels[name] || name];
            }}
          />
          <Bar dataKey="puntaje" fill={COLORS.cyan} fillOpacity={0.85} radius={[0, 4, 4, 0]}>
            <LabelList
              dataKey="puntaje"
              position="right"
              formatter={(v: number) => v.toString()}
              style={{ fontSize: 10, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <ReferenceLine x={500} stroke={COLORS.emerald} strokeDasharray="4 4" strokeWidth={1.5} />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>La brecha con OCDE persiste hace una década.</strong> En
        matemáticas 2022 Colombia estuvo 89 puntos por debajo del promedio
        OCDE — equivalente a más de 2 años de escolaridad. Las mejoras entre
        2012 y 2015 se han estancado o retrocedido. En 2022 el <strong>60% de
        los estudiantes colombianos no alcanzó el nivel 2 en matemáticas</strong>
        (mínimo para participar en la sociedad moderna). Sin un cambio
        significativo en calidad educativa, la trampa del capital humano
        seguirá bloqueando el desarrollo.
      </div>
    </ChartFrame>
  );
}
