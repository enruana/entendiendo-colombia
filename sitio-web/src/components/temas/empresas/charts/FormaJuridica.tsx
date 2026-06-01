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
  forma: string;
  n: number;
  pct: number;
}

const colorByForma: Record<string, string> = {
  "S.A.S": COLORS.violet,
  "S.A.": COLORS.indigo,
  Ltda: COLORS.amber,
  "E.S.P": COLORS.cyan,
  "S.C.A": COLORS.rose,
  BIC: COLORS.emerald,
  Cooperativa: COLORS.pink,
  Otros: COLORS.slate,
};

export default function FormaJuridica() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/forma_juridica_top1000_supersociedades.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows = lines
          .slice(1)
          .map((line) => {
            const v = line.split(",");
            return { forma: v[0], n: Number(v[1]), pct: Number(v[2]) };
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
      number="Gráfica 2 · El reino de la SAS"
      title="Forma jurídica entre las 1.000 empresas más grandes (FY 2023)"
      description="Casi la mitad de las grandes empresas que reportan a SuperSociedades son S.A.S, figura creada por la Ley 1258 de 2008. La Sociedad Anónima clásica (S.A.) es la segunda forma más común, seguida de un cajón residual que mezcla sucursales extranjeras, fundaciones y cajas de compensación. La Ltda — antes dominante — es ya marginal."
      source="SuperSociedades — Base 1.000 empresas FY 2023 (forma jurídica inferida de razón social)"
      legend={
        <>
          <LegendItem color={COLORS.violet} label="S.A.S — la dominante" />
          <LegendItem color={COLORS.indigo} label="S.A. — la clásica" />
          <LegendItem color={COLORS.amber} label="Ltda — en declive" />
          <LegendItem color={COLORS.slate} label="Otros — extranjeras, fundaciones" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={320}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 60, left: 30, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" horizontal={false} />
          <XAxis
            type="number"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            domain={[0, 550]}
          />
          <YAxis
            type="category"
            dataKey="forma"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
            width={90}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              return [
                `${v} empresas · ${r?.pct ?? "?"}% del top 1.000`,
                "Conteo",
              ];
            }}
          />
          <Bar dataKey="n" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={colorByForma[d.forma] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="n"
              position="right"
              formatter={(v: number) => {
                const pct = data.find((d) => d.n === v)?.pct;
                return `${v} (${pct}%)`;
              }}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-violet-200 bg-violet-50/50 p-3 text-xs text-violet-900 leading-relaxed">
        <strong>El triunfo de la SAS:</strong> antes de 2008 las grandes empresas
        colombianas usaban casi todas la figura de S.A. o Ltda. La SAS — creada por
        la Ley 1258 de 2008 — eliminó requisitos costosos (revisor fiscal obligatorio,
        mínimo 5 accionistas, junta directiva) y permitió constituirse con un
        accionista único y por documento privado. En menos de dos décadas, se comió
        la mitad del segmento.
      </div>
    </ChartFrame>
  );
}
