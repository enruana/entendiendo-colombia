import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

interface Row {
  anio: string;
  renta: number;
  iva_interno: number;
  iva_externo: number;
  gmf: number;
  otros: number;
  total: number;
}

export default function RecaudoHistorico() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/estado-finanzas/dian_recaudo_anual_1970_2026.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const header = lines[0].split(",");
        const idx = (k: string) => header.indexOf(k);
        const rows: Row[] = lines.slice(1).map((line) => {
          const v = line.split(",");
          const renta = Number(v[idx("renta_total")]) / 1_000_000; // millones -> billones
          const iva_int = Number(v[idx("iva_interno_total")]) / 1_000_000;
          const iva_ext = Number(v[idx("iva_externo")]) / 1_000_000;
          const gmf = Number(v[idx("gmf")]) / 1_000_000;
          const total = Number(v[idx("total_dian")]) / 1_000_000;
          const otros = Math.max(0, total - renta - iva_int - iva_ext - gmf);
          return {
            anio: v[idx("anio")],
            renta,
            iva_interno: iva_int,
            iva_externo: iva_ext,
            gmf,
            otros,
            total,
          };
        });
        // Filtrar a partir de 2000 y excluir 2026 que es parcial
        const filtered = rows.filter(
          (r) => Number(r.anio) >= 2000 && Number(r.anio) <= 2025,
        );
        setData(filtered);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos DIAN...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Gráfica 1 · Recaudo histórico"
      title="Recaudo tributario DIAN 2000-2025"
      description="Recaudo bruto anual administrado por la DIAN, desagregado por tipo de tributo. Los valores están en billones de pesos corrientes (cada año en su propia moneda; no ajustado por inflación). El recaudo nominal crece todos los años por la inflación, pero su composición sí cambia: la renta y el IVA dominan; el GMF (4×1000) ha sido relativamente estable; los aranceles han perdido peso por los TLC."
      source="DIAN — Estadísticas de recaudo anual por tipo de impuesto, 1970-2026 (corte abril 2026)"
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="Renta y complementarios" />
          <LegendItem color={COLORS.cyan} label="IVA interno" />
          <LegendItem color={COLORS.violet} label="IVA externo (importaciones)" />
          <LegendItem color={COLORS.amber} label="GMF (4×1000)" />
          <LegendItem color={COLORS.slate} label="Otros (consumo, gasolina, riqueza...)" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 15, right: 20, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="gRenta" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.emerald} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.emerald} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="gIvaInt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.cyan} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.cyan} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="gIvaExt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.violet} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.violet} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="gGmf" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.amber} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.amber} stopOpacity={0.5} />
            </linearGradient>
            <linearGradient id="gOtros" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={COLORS.slate} stopOpacity={0.85} />
              <stop offset="100%" stopColor={COLORS.slate} stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-30}
            textAnchor="end"
            height={50}
            interval={3}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${v.toFixed(0)}B`}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                renta: "Renta",
                iva_interno: "IVA interno",
                iva_externo: "IVA externo",
                gmf: "GMF",
                otros: "Otros",
              };
              return [`$${value.toFixed(1)} billones`, labels[name] || name];
            }}
          />
          <Area
            type="monotone"
            dataKey="renta"
            stackId="1"
            stroke={COLORS.emerald}
            fill="url(#gRenta)"
          />
          <Area
            type="monotone"
            dataKey="iva_interno"
            stackId="1"
            stroke={COLORS.cyan}
            fill="url(#gIvaInt)"
          />
          <Area
            type="monotone"
            dataKey="iva_externo"
            stackId="1"
            stroke={COLORS.violet}
            fill="url(#gIvaExt)"
          />
          <Area
            type="monotone"
            dataKey="gmf"
            stackId="1"
            stroke={COLORS.amber}
            fill="url(#gGmf)"
          />
          <Area
            type="monotone"
            dataKey="otros"
            stackId="1"
            stroke={COLORS.slate}
            fill="url(#gOtros)"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-cyan-200 bg-cyan-50/50 p-3 text-xs text-cyan-900 leading-relaxed">
        <strong>El recaudo creció de ~$21 billones en 2000 a $294 billones en 2025</strong>{" "}
        (×14 veces en pesos corrientes). La <em>renta</em> es históricamente el impuesto
        más importante (~50% del total). El <em>IVA</em> sumando interno y externo aporta
        otro ~40%. El <em>GMF</em> — el famoso "4 por 1.000" creado como temporal en 1998
        — sigue ahí, generando ~$16 billones al año. La caída visible en 2024 (-4% vs
        2023) se asocia al menor recaudo por renta de personas jurídicas y a devoluciones.
      </div>
    </ChartFrame>
  );
}
