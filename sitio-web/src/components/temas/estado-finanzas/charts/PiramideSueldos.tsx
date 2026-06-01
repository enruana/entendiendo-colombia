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
import ChartFrame from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// Salario mínimo 2026: $1.750.905
const SMMLV_2026 = 1_750_905;

// Datos: asignación básica mensual 2026 según decretos del 25 de marzo de 2026
// (Decretos 0297, 0303, 0312, 0313, 0316, etc.)
// La asignación BÁSICA no incluye primas técnicas, prestaciones, etc.
const cargos = [
  { cargo: "Salario mínimo", sueldo: 1_750_905 },
  { cargo: "Mediana ocupado (GEIH)", sueldo: 1_800_000 },
  { cargo: "Profesional grado 1 (entrada)", sueldo: 3_500_000 },
  { cargo: "Asesor grado 19 (alto rango)", sueldo: 12_500_000 },
  { cargo: "Congresista (asignación base)", sueldo: 18_601_803 },
  { cargo: "Ministro / Magistrado Auxiliar", sueldo: 21_500_000 },
  { cargo: "Magistrado Alta Corte", sueldo: 33_500_000 },
  { cargo: "Presidente de la República", sueldo: 36_650_000 },
];

const data = cargos.map((c) => ({
  ...c,
  smmlv: c.sueldo / SMMLV_2026,
}));

export default function PiramideSueldos() {
  return (
    <ChartFrame
      number="Gráfica 1 · Pirámide salarial"
      title="¿Cuánto gana cada quien en el Estado colombiano? (asignación básica 2026)"
      description={`Asignación BÁSICA mensual en pesos, según los decretos de aumento salarial del 25 de marzo de 2026 (Petro). El Presidente, los magistrados y los congresistas tienen los topes legales. Pero estas son asignaciones BÁSICAS: no incluyen primas técnicas, gastos de representación ni otras compensaciones que pueden subir el ingreso total un 30-70%.`}
      source="Decretos 0297, 0303, 0312, 0313 y 0316 de 2026 (25-mar-2026) + Decreto 0030 de 2026 (eliminación prima especial congresistas). Salario mínimo 2026: $1.750.905. GEIH feb 2026 para mediana ocupado."
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
            tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`}
          />
          <YAxis
            type="category"
            dataKey="cargo"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            width={240}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, _name, item) => {
              const d = item.payload as (typeof data)[number];
              return [
                `$${Math.round(value).toLocaleString("es-CO")}  (${d.smmlv.toFixed(1)}× SMMLV)`,
                "Asignación mensual",
              ];
            }}
          />
          <Bar dataKey="sueldo" radius={[0, 6, 6, 0]}>
            {data.map((d, i) => {
              const isExtremes = i === 0 || i === 1;
              const isPresident = i === data.length - 1;
              const color = isExtremes
                ? COLORS.slate
                : isPresident
                  ? COLORS.amber
                  : COLORS.emerald;
              return <Cell key={i} fill={color} />;
            })}
            <LabelList
              dataKey="smmlv"
              position="right"
              formatter={(v: number) => `${v.toFixed(1)}× SMMLV`}
              style={{ fontSize: 11, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartFrame>
  );
}
