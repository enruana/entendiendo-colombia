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
  tamano: string;
  n2024: number;
  n2025: number;
  variacion: number;
  porcentaje: number;
}

export default function CreacionPorTamano() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/creacion_por_tamano_2025_H1.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows = lines.slice(1).map((line) => {
          const v = line.split(",");
          return {
            tamano: v[0],
            n2024: Number(v[1]),
            n2025: Number(v[2]),
            variacion: Number(v[3]),
            porcentaje: Number(v[4]),
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

  const tamanoColors: Record<string, string> = {
    Micro: COLORS.amber,
    Pequena: COLORS.violet,
    Mediana: COLORS.indigo,
    Grande: COLORS.rose,
  };

  return (
    <ChartFrame
      number="Gráfica 1 · La asimetría del tamaño"
      title="Casi todo lo que nace es micro (primer semestre 2025)"
      description="De las 173.907 empresas creadas en el primer semestre de 2025, 173.450 (99,7%) son microempresas. Solo se constituyeron 3 grandes en seis meses en todo el país. La forma del tejido empresarial colombiano es radicalmente piramidal."
      source="Confecámaras — Informe de Dinámica de Creación de Empresas H1-2025 (clasificación por valor de activos)"
      legend={
        <>
          <LegendItem color={COLORS.amber} label="Micro" />
          <LegendItem color={COLORS.violet} label="Pequeña" />
          <LegendItem color={COLORS.indigo} label="Mediana" />
          <LegendItem color={COLORS.rose} label="Grande" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 30, right: 20, left: 0, bottom: 10 }}
          barCategoryGap="25%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="tamano"
            stroke="#525252"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            fontWeight={600}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `${Math.round(v / 1000)}K`}
            domain={[0, 200000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, _name: string, props: { payload?: Row }) => {
              const r = props.payload;
              if (!r) return [v, ""];
              const sign = r.variacion >= 0 ? "+" : "";
              return [
                `${v.toLocaleString("es-CO")} · ${r.porcentaje}% del total · ${sign}${r.variacion}% vs 2024 H1`,
                "Empresas",
              ];
            }}
          />
          <Bar dataKey="n2025" radius={[6, 6, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={tamanoColors[d.tamano] ?? COLORS.slate} />
            ))}
            <LabelList
              dataKey="n2025"
              position="top"
              formatter={(v: number) =>
                v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v.toString()
              }
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>Atención metodológica:</strong> Confecámaras todavía clasifica por
        el criterio histórico de <em>valor de activos</em> (Ley 905/2004), no por el
        de <em>ingresos por actividades ordinarias</em> introducido por el Decreto
        957 de 2019. Por eso este gráfico no es directamente comparable con la
        clasificación oficial vigente para política pública. La asimetría es robusta
        a cualquiera de las dos métricas.
      </div>
    </ChartFrame>
  );
}
