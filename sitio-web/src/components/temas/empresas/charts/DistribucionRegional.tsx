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
  departamento: string;
  porcentaje: number;
  n: number;
  nota: string;
}

const colorByPos: string[] = [
  COLORS.violet,
  COLORS.indigo,
  COLORS.cyan,
  COLORS.amber,
  COLORS.slate,
];

export default function DistribucionRegional() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/empresas_por_departamento_rues_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            departamento: v[0],
            porcentaje: Number(v[1]),
            n: Number(v[2]),
            nota: v[3] ?? "",
          };
        });
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
      number="Gráfica 1 · La concentración territorial"
      title="Distribución del tejido empresarial por departamento (RUES, 2025)"
      description="Solo cuatro jurisdicciones — Bogotá, Antioquia, Valle y Cundinamarca — concentran el 53% de las 1,8 millones de empresas activas en Colombia. Las otras 29 entidades territoriales se reparten el 47% restante. La desigualdad territorial del tejido empresarial es del mismo orden que la del PIB."
      source="Confecámaras — RUES, cierre 2025 (1.805.564 empresas totales en el país)"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="Bogotá (23,7%)" />
          <LegendItem color={COLORS.indigo} label="Antioquia (13,8%)" />
          <LegendItem color={COLORS.cyan} label="Valle (8,8%)" />
          <LegendItem color={COLORS.amber} label="Cundinamarca (6,7%)" />
          <LegendItem color={COLORS.slate} label="Resto (47%)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 80, left: 30, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v}%`}
            domain={[0, 50]}
          />
          <YAxis
            type="category"
            dataKey="departamento"
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
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              if (!r) return [v, ""];
              return [
                `${v}% (~${r.n.toLocaleString("es-CO")} empresas) — ${r.nota}`,
                "Tejido empresarial",
              ];
            }}
          />
          <Bar dataKey="porcentaje" radius={[0, 6, 6, 0]}>
            {data.map((_, i) => (
              <Cell key={i} fill={colorByPos[i] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="porcentaje"
              position="right"
              formatter={(v: number) => `${v}%`}
              style={{ fontSize: 12, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
