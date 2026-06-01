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
  macrosector: string;
  n: number;
  ingresos: number;
  ganancia: number;
  margenPct: number;
}

const colorByMacro: Record<string, string> = {
  COMERCIO: COLORS.indigo,
  SERVICIOS: COLORS.violet,
  MANUFACTURA: COLORS.amber,
  "MINERO-HIDROCARBUROS": COLORS.rose,
  CONSTRUCCIÓN: COLORS.cyan,
  AGROPECUARIO: COLORS.emerald,
};

export default function MacrosectorIngresoUtilidad() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/macrosector_top1000_fy2024.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines
          .slice(1)
          .map((line) => {
            const v = line.split(",");
            const ing = Number(v[2]);
            const ut = Number(v[3]);
            return {
              macrosector: v[0],
              n: Number(v[1]),
              ingresos: ing,
              ganancia: ut,
              margenPct: ing > 0 ? (ut / ing) * 100 : 0,
            };
          })
          .sort((a, b) => b.ingresos - a.ingresos);
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
      number="Gráfica 3 · Quién factura, quién gana"
      title="Ingresos y margen neto por macrosector (top 1.000, FY 2024)"
      description="Comercio lidera en ingresos ($366B) pero gana muy poco — margen de apenas 1,8%. Servicios factura menos ($307B) pero genera $51B de utilidad — margen de 16,5%. Minero/hidrocarburos están en el medio: alta facturación con margen sólido. La rentabilidad varía drásticamente entre sectores."
      source="SuperSociedades — Base 1.000 empresas FY 2024 (margen neto = ganancia / ingresos × 100)"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="Ingresos operacionales" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={360}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 30, left: 30, bottom: 20 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="macrosector"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            fontWeight={600}
            angle={-15}
            textAnchor="end"
            height={55}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${(v / 1_000_000_000).toFixed(0)}B`}
            domain={[0, 400_000_000_000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              if (!r) return [v, ""];
              return [
                `$${(v / 1_000_000_000).toFixed(1)}B · ${r.n} empresas · margen ${r.margenPct.toFixed(1)}%`,
                "Ingresos 2024",
              ];
            }}
          />
          <Bar dataKey="ingresos" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={colorByMacro[d.macrosector] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="margenPct"
              position="top"
              formatter={(v: number) => `${v.toFixed(1)}% margen`}
              style={{ fontSize: 10, fontWeight: 700, fill: COLORS.rose }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
