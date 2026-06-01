import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  tamano: string;
  n: number;
  pct: number;
}

const colorByTamano: Record<string, string> = {
  Micro: COLORS.amber,
  Pequena: COLORS.violet,
  Mediana: COLORS.indigo,
  Grande: COLORS.rose,
};

export default function StockPorTamano() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/stock_empresas_por_tamano_2024.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            tamano: v[0],
            n: Number(v[1]),
            pct: Number(v[2]),
          };
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

  const total = data.reduce((acc, d) => acc + d.n, 0);

  return (
    <ChartFrame
      number="Gráfica 1 · El 99% del tejido"
      title="Stock empresarial formal por tamaño (RUES, 2024)"
      description={`Las 1.734.636 empresas activas en el Registro Único Empresarial al cierre de 2024 se distribuyen así: 91,8% micro, 6,1% pequeñas, 1,6% medianas y 0,5% grandes. La forma del tejido empresarial colombiano es radicalmente piramidal — un puñado de gigantes apoyado en un piso enorme de micros.`}
      source="Confecámaras — RUES, matrículas vigentes a cierre 2024 (clasificación por activos)"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Micro (91,8%)" />
          <LegendItem color={COLORS.violet} label="Pequeña (6,1%)" />
          <LegendItem color={COLORS.indigo} label="Mediana (1,6%)" />
          <LegendItem color={COLORS.rose} label="Grande (0,5%)" />
        </>
      }
    >
      <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={data}
              dataKey="n"
              nameKey="tamano"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={130}
              paddingAngle={1}
              startAngle={90}
              endAngle={-270}
            >
              {data.map((d, i) => (
                <Cell key={i} fill={colorByTamano[d.tamano] ?? COLORS.slate} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              labelStyle={tooltipLabelStyle}
              formatter={(v: number, _name, props: { payload?: Row }) => {
                const r = props.payload;
                return [
                  `${v.toLocaleString("es-CO")} empresas · ${r?.pct}%`,
                  r?.tamano ?? "",
                ];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 text-center text-xs text-neutral-500">
        Total: <strong className="text-neutral-700">{total.toLocaleString("es-CO")}</strong> empresas activas en RUES
      </div>
    </ChartFrame>
  );
}
