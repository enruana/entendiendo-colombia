import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  departamento: string;
  n: number;
  pct: number;
  ingresos: number;
}

export default function GrandesPorDepartamento() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/depto_top1000_fy2024.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines
          .slice(1)
          .map((line) => {
            const v = line.split(",");
            return {
              departamento: v[0],
              n: Number(v[1]),
              ingresos: Number(v[2]),
              pct: Number(v[3]),
            };
          })
          .filter((r) => r.n >= 8)
          .slice(0, 12);
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 2 · El gran capital concentrado"
      title="Las 1.000 empresas más grandes por departamento (FY 2024)"
      description="Si la distribución del tejido empresarial es desigual, la de las grandes empresas es aún más extrema. Bogotá tiene 480 de las 1.000 mayores (48%) y concentra $700,6 billones de los $1.183 billones de ingresos del top — un 59,2% del peso económico del segmento. Antioquia y Valle suman otro 27%."
      source="SuperSociedades — Base 1.000 empresas FY 2024 (ingresos en miles de millones de pesos colombianos)"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="Empresas (eje izquierdo)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 80, left: 60, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            domain={[0, 520]}
          />
          <YAxis
            type="category"
            dataKey="departamento"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            fontWeight={600}
            width={140}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              if (!r) return [v, ""];
              return [
                `${v} empresas · $${(r.ingresos / 1_000_000_000).toFixed(1)}B ingresos · ${r.pct}% del top 1.000`,
                "Top 1.000",
              ];
            }}
          />
          <Bar dataKey="n" radius={[0, 6, 6, 0]} fill={COLORS.violet}>
            <LabelList
              dataKey="n"
              position="right"
              formatter={(v: number) => `${v}`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>Lectura desigualdad:</strong> Bogotá tiene 23,7% del tejido total
        pero 48% de las 1.000 grandes. La concentración se intensifica con el
        tamaño. Los departamentos del Pacífico colombiano (excluyendo Valle) y
        gran parte de la Amazonía y Orinoquia no aparecen en este ranking.
      </div>
    </ChartFrame>
  );
}
