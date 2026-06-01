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
  ReferenceLine,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  categoria: string;
  segmento: string;
  supervivencia: number;
}

const COLOR_BY_CAT: Record<string, string> = {
  "Organizacion juridica": COLORS.violet,
  Tamano: COLORS.amber,
  Sector: COLORS.cyan,
};

export default function Supervivencia() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/supervivencia_5anos.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            categoria: v[0],
            segmento: v[1],
            supervivencia: Number(v[2]),
          };
        });
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 2 · Quién sobrevive a 5 años"
      title="Tasa de supervivencia empresarial a 5 años, por categoría (cohorte 2017→2022)"
      description="De las empresas creadas en 2017, solo 34,6% seguían operando en 2022. Pero esa cifra esconde diferencias gigantes: las sociedades sobreviven más que las personas naturales, las grandes más que las micros, y la construcción más que servicios. La barrera de los 5 años filtra brutalmente quién se queda."
      source="Confecámaras — Cartilla 17: Nuevos hallazgos de la supervivencia y crecimiento de las empresas en Colombia (cohorte 2017)"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="Organización jurídica" />
          <LegendItem color={COLORS.amber} label="Tamaño" />
          <LegendItem color={COLORS.cyan} label="Sector económico" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 60, left: 40, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 80]}
          />
          <YAxis
            type="category"
            dataKey="segmento"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            fontWeight={600}
            width={170}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              return [`${v}% sobreviven a 5 años`, r?.categoria ?? ""];
            }}
          />
          <ReferenceLine
            x={34.6}
            stroke={COLORS.rose}
            strokeDasharray="4 3"
            strokeWidth={1.5}
            label={{
              value: "Promedio nacional 34,6%",
              position: "top",
              fill: COLORS.rose,
              fontSize: 11,
              fontWeight: 600,
            }}
          />
          <Bar dataKey="supervivencia" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={COLOR_BY_CAT[d.categoria] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="supervivencia"
              position="right"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
