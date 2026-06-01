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
  Cell,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  dimension: string;
  mipymes: number;
  grandes: number;
}

export default function ParadojaMipymes() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/aporte_economico_por_tamano_2022.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            dimension: v[0],
            mipymes: Number(v[1]),
            grandes: Number(v[2]),
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

  return (
    <ChartFrame
      number="Gráfica 2 · La paradoja del 99%"
      title="Mipymes vs grandes: la asimetría entre cantidad y peso económico"
      description="Las mipymes son el 99,5% de las empresas pero generan ~40% del PIB. Las grandes — apenas 0,5% del tejido — concentran 60% del PIB y 47% del empleo formal. Cuando el debate público habla de 'apoyar al 99%', se refiere a empresas que producen menos de la mitad del valor agregado del país."
      source="Confecamaras (RUES 2022) · ACOPI/ANIF (PIB) · BBVA Research con GEIH may-jul 2023 (empleo)"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Mipymes (micro + pequena + mediana)" />
          <LegendItem color={COLORS.rose} label="Grandes" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 80, left: 20, bottom: 10 }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 100]}
          />
          <YAxis
            type="category"
            dataKey="dimension"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
            width={170}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                mipymes: "Mipymes",
                grandes: "Grandes",
              };
              return [`${v}%`, labels[name] ?? name];
            }}
          />
          <Bar dataKey="mipymes" stackId="a" fill={COLORS.amber} radius={[6, 0, 0, 6]}>
            <LabelList
              dataKey="mipymes"
              position="insideRight"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 12, fontWeight: 700, fill: "#fff" }}
            />
          </Bar>
          <Bar dataKey="grandes" stackId="a" fill={COLORS.rose} radius={[0, 6, 6, 0]}>
            <LabelList
              dataKey="grandes"
              position="insideRight"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 12, fontWeight: 700, fill: "#fff" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>La lectura central:</strong> en cantidad de empresas las mipymes
        dominan abrumadoramente (99,5%), pero esa hegemonía se invierte cuando
        miras PIB (40%). Cada empresa grande aporta, en promedio, más de
        <strong> 250 veces</strong> al PIB que cada mipyme. La paradoja del 99%
        es real y operable: <em>política para mipymes</em> y <em>política para
        grandes</em> son palancas distintas con efectos distintos.
      </div>
    </ChartFrame>
  );
}
