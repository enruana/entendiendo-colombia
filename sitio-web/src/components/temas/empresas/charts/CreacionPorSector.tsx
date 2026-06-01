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
  sector: string;
  v: number;
}

export default function CreacionPorSector() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/creacion_empresas_por_sector_2024_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines
          .slice(1)
          .map((line) => {
            const v = line.split(",");
            return { sector: v[0], v: Number(v[3]) };
          })
          .sort((a, b) => b.v - a.v);
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[300px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 3 · Quién crece, quién cae"
      title="Variación en la creación de empresas por sector (2025 H1 vs 2024 H1)"
      description="Tres sectores impulsaron el rebote de 2025: agricultura, comercio y servicios. La construccion y la industria, en cambio, contribuyeron negativamente — sector senial de la desaceleracion productiva."
      source="Confecamaras — Informe de Dinamica de Creacion de Empresas H1-2025"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Variación positiva" />
          <LegendItem color={COLORS.rose} label="Variación negativa" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 50, left: 80, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${v > 0 ? "+" : ""}${v}%`}
            domain={[-10, 20]}
          />
          <YAxis
            type="category"
            dataKey="sector"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
            width={75}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number) => [`${v > 0 ? "+" : ""}${v.toFixed(1)}%`, "Variación"]}
          />
          <Bar dataKey="v" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={d.v >= 0 ? COLORS.emerald : COLORS.rose} />
            ))}
            <LabelList
              dataKey="v"
              position="right"
              formatter={(v: number) => `${v > 0 ? "+" : ""}${v.toFixed(1)}%`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
