import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  ReferenceDot,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  anio: number;
  periodo: string;
  total: number;
  pn: number | null;
  soc: number | null;
}

export default function CreacionEmpresasAnual() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empresas/creacion_empresas_anual_2020_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          const pn = v[3] ? Number(v[3]) : NaN;
          const soc = v[4] ? Number(v[4]) : NaN;
          return {
            anio: Number(v[0]),
            periodo: v[1],
            total: Number(v[2]),
            pn: Number.isFinite(pn) && pn > 0 ? pn : null,
            soc: Number.isFinite(soc) && soc > 0 ? soc : null,
          };
        });
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos...</div>
      </div>
    );
  }

  // Etiqueta del eje X: 2025 H1 vs anual
  const chartData = data.map((d) => ({
    ...d,
    label: d.periodo === "primer_semestre" ? `${d.anio} H1` : `${d.anio}`,
  }));

  return (
    <ChartFrame
      number="Gráfica 2 · Nacimientos empresariales"
      title="Empresas creadas en Colombia por año (2020–2025)"
      description="Despues del rebote de la pandemia (+10,6% en 2021), la creacion de empresas en Colombia ha venido perdiendo dinamismo. 2024 fue el segundo ano consecutivo con caida (-2,8%) y 2025 H1 muestra un leve repunte (+1,9% vs el mismo periodo de 2024)."
      source="Confecamaras — Informe de Dinamica de Creacion de Empresas (RUES) · 2021–2025"
      legend={
        <>
          <LegendItem color={COLORS.indigo} label="Total creadas" />
          <LegendItem color={COLORS.amber} label="Personas naturales" shape="line" />
          <LegendItem color={COLORS.violet} label="Sociedades" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart
          data={chartData}
          margin={{ top: 30, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="label"
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
            domain={[0, 360000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(v: number, name: string) => {
              const labels: Record<string, string> = {
                total: "Total creadas",
                pn: "Personas naturales",
                soc: "Sociedades",
              };
              if (v === null || v === undefined) return ["—", labels[name] ?? name];
              return [v.toLocaleString("es-CO"), labels[name] ?? name];
            }}
          />
          <Bar dataKey="total" fill={COLORS.indigo} radius={[6, 6, 0, 0]}>
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: number) => `${Math.round(v / 1000)}K`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            type="monotone"
            dataKey="pn"
            stroke={COLORS.amber}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.amber }}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="soc"
            stroke={COLORS.violet}
            strokeWidth={2.5}
            dot={{ r: 4, fill: COLORS.violet }}
            connectNulls
          />
          <ReferenceDot
            x="2022"
            y={310731}
            r={6}
            fill="none"
            stroke={COLORS.rose}
            strokeWidth={2}
            strokeDasharray="2 2"
            label={{
              value: "Pico: 310.731",
              position: "top",
              fill: COLORS.rose,
              fontSize: 10,
              fontWeight: 700,
            }}
          />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50/50 p-3 text-xs text-amber-900 leading-relaxed">
        <strong>Atención al 2025:</strong> la cifra de 173.907 corresponde a enero–junio
        (primer semestre); no es comparable directamente con el total anual de los demás
        años. Se incluye para mostrar tendencia. El informe anual 2025 completo
        normalmente se publica en enero de 2026.
      </div>
    </ChartFrame>
  );
}
