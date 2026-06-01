import { useEffect, useState } from "react";
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

interface Row {
  macro: string;
  n: number;
  ingresos: number;
  pctEmp: number;
  pctIng: number;
}

const colorByMacro: Record<string, string> = {
  Servicios: COLORS.violet,
  Comercio: COLORS.indigo,
  Manufactura: COLORS.amber,
  Minero: COLORS.rose,
  Construccion: COLORS.cyan,
  Agropecuario: COLORS.emerald,
};

export default function MacrosectorTop1000() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/macrosector_top1000_supersociedades.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows = lines
          .slice(1)
          .map((line) => {
            const v = line.split(",");
            return {
              macro: v[0],
              n: Number(v[1]),
              ingresos: Number(v[2]),
              pctEmp: Number(v[3]),
              pctIng: Number(v[4]),
            };
          })
          .sort((a, b) => b.n - a.n);
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[320px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 3 · Cuántas y cuánto facturan"
      title="Macrosector en el top 1.000 (número de empresas vs ingresos 2023)"
      description="Servicios, comercio y manufactura concentran el 87% de las 1.000 empresas más grandes. Pero cuando miras ingresos, el panorama cambia: el sector minero — con apenas 44 empresas — genera más ingresos que comercio y casi tanto como manufactura. Sectores distintos tienen densidades de ingreso por empresa muy distintas."
      source="SuperSociedades — Base 1.000 empresas FY 2023 (ingresos en miles de millones de COP)"
      legend={
        <>
          <LegendItem color={COLORS.indigo} label="Número de empresas" />
          <LegendItem color={COLORS.rose} label="% de los ingresos" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 20 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="macro"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            fontWeight={600}
            angle={-15}
            textAnchor="end"
            height={45}
          />
          <YAxis
            yAxisId="left"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            domain={[0, 350]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 50]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string, props: { payload?: Row }) => {
              const r = props.payload;
              if (name === "n") return [`${v} empresas (${r?.pctEmp}%)`, "Conteo"];
              if (name === "pctIng") {
                const ing = r?.ingresos ?? 0;
                return [
                  `${v.toFixed(1)}% — $${(ing / 1_000_000).toFixed(1)} MM (miles de millones COP)`,
                  "% de ingresos del top 1.000",
                ];
              }
              return [v, name];
            }}
          />
          <Bar yAxisId="left" dataKey="n" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={`n-${i}`} fill={colorByMacro[d.macro] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="n"
              position="top"
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Bar yAxisId="right" dataKey="pctIng" radius={[6, 6, 0, 0]} fill={COLORS.rose} opacity={0.6}>
            <LabelList
              dataKey="pctIng"
              position="top"
              formatter={(v: number) => `${v.toFixed(0)}%`}
              style={{ fontSize: 10, fontWeight: 700, fill: COLORS.rose }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
