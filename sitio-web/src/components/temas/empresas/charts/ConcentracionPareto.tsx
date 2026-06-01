import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  rango: number;
  pct: number;
}

export default function ConcentracionPareto() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/concentracion_top1000_fy2024.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        // Add origen 0,0
        const rows: Row[] = [{ rango: 0, pct: 0 }];
        lines.slice(1).forEach((line) => {
          const v = line.split(",");
          rows.push({ rango: Number(v[0]), pct: Number(v[2]) });
        });
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[360px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 2 · La curva de concentración"
      title="¿Cuánto ingresan las primeras N empresas del top 1.000? (FY 2024)"
      description="Las primeras 10 empresas acumulan 23,7% de los ingresos del top 1.000. Las 50 primeras, 42,1%. Las 100 primeras, 51,9%. Para llegar al 84%, basta con las 500 primeras: las 500 últimas del ranking apenas aportan el 16% restante. La asimetría es del estilo Pareto pero aún más extrema."
      source="SuperSociedades — Base 1.000 empresas FY 2024"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="% acumulado de ingresos" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis
            dataKey="rango"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            type="number"
            domain={[0, 1000]}
            ticks={[0, 100, 250, 500, 750, 1000]}
            label={{
              value: "Posición en el ranking (1 = más grande)",
              position: "insideBottom",
              offset: -5,
              fontSize: 11,
              fill: "#737373",
            }}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => [
              `${v}% del ingreso total del top 1.000`,
              `Las primeras ${props.payload?.rango ?? "?"} empresas`,
            ]}
          />
          <ReferenceLine
            y={50}
            stroke={COLORS.rose}
            strokeDasharray="3 3"
            label={{ value: "50%", position: "right", fontSize: 10, fill: COLORS.rose }}
          />
          <ReferenceDot x={100} y={51.9} r={6} fill={COLORS.violet} stroke="#fff" strokeWidth={2}>
          </ReferenceDot>
          <Line
            type="monotone"
            dataKey="pct"
            stroke={COLORS.violet}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.violet }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>Lectura:</strong> las primeras <strong>100 empresas</strong> ya
        cruzan la mitad de los ingresos del top 1.000. Si extrapolamos al universo
        empresarial completo (1,8 millones de empresas), la concentración es
        todavía mayor: el top 100 produciría una fracción enorme del PIB privado
        formal. Es la matemática de la productividad colombiana.
      </div>
    </ChartFrame>
  );
}
