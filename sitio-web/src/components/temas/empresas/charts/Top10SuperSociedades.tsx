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
  rank: number;
  razon: string;
  macrosector: string;
  departamento: string;
  ingresos: number;
}

const colorByMacro: Record<string, string> = {
  "MINERO-HIDROCARBUROS": COLORS.rose,
  COMERCIO: COLORS.indigo,
  SERVICIOS: COLORS.violet,
  MANUFACTURA: COLORS.amber,
  CONSTRUCCIÓN: COLORS.cyan,
  AGROPECUARIO: COLORS.emerald,
};

export default function Top10SuperSociedades() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/top10_supersociedades_fy2024.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines
          .slice(1)
          .map((line) => {
            const v = line.split(",");
            return {
              rank: Number(v[0]),
              razon: v[1],
              macrosector: v[3],
              departamento: v[4],
              ingresos: Number(v[5]),
            };
          })
          .sort((a, b) => b.ingresos - a.ingresos);
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
      number="Gráfica 1 · El podio del PIB privado"
      title="Top 10 empresas por ingresos operacionales (FY 2024)"
      description="Las 10 empresas más grandes de Colombia facturaron $280 billones de pesos en 2024 — 23,7% de los ingresos del top 1.000. Ecopetrol sola representa casi un 10% del top. La cabeza de la lista mezcla petróleo, energía, comercio retail y telecomunicaciones."
      source="SuperSociedades — Base 1.000 empresas FY 2024 (ingresos en miles de millones de pesos colombianos)"
      legend={
        <>
          <LegendItem color={COLORS.rose} label="Minero-Hidrocarburos" />
          <LegendItem color={COLORS.indigo} label="Comercio" />
          <LegendItem color={COLORS.violet} label="Servicios" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={420}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 80, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${(v / 1_000_000_000).toFixed(0)}B`}
            domain={[0, 130_000_000_000]}
          />
          <YAxis
            type="category"
            dataKey="razon"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            fontWeight={600}
            width={200}
            tickFormatter={(s: string) => (s.length > 28 ? `${s.slice(0, 26)}…` : s)}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              if (!r) return [v, ""];
              return [
                `$${(v / 1_000_000_000).toFixed(1)}B · ${r.macrosector} · ${r.departamento}`,
                "Ingresos 2024",
              ];
            }}
          />
          <Bar dataKey="ingresos" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={colorByMacro[d.macrosector] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="ingresos"
              position="right"
              formatter={(v: number) => `$${(v / 1_000_000_000).toFixed(1)}B`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
