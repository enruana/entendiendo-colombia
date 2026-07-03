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
} from "recharts";
import ChartFrame, { LegendItem } from "../../../charts/ChartFrame";
import { COLORS, tooltipStyle, tooltipLabelStyle } from "../../../charts/shared";

// SMMLV nominal y real (base 2014 = 100), auxilio de transporte y valor total
// Deflactor: IPC acumulado desde 2014 en base 100
// IPC dic 2014 = 100.00
// IPC dic 2025 aprox = 173.5 (acumulado con inflación anual dic-dic)
const data = [
  { anio: "2014", smmlv: 616000, auxilio: 72000, ipcBase: 100.0 },
  { anio: "2015", smmlv: 644350, auxilio: 74000, ipcBase: 106.8 },
  { anio: "2016", smmlv: 689455, auxilio: 77700, ipcBase: 112.9 },
  { anio: "2017", smmlv: 737717, auxilio: 83140, ipcBase: 117.6 },
  { anio: "2018", smmlv: 781242, auxilio: 88211, ipcBase: 121.3 },
  { anio: "2019", smmlv: 828116, auxilio: 97032, ipcBase: 125.9 },
  { anio: "2020", smmlv: 877803, auxilio: 102854, ipcBase: 127.9 },
  { anio: "2021", smmlv: 908526, auxilio: 106454, ipcBase: 135.1 },
  { anio: "2022", smmlv: 1000000, auxilio: 117172, ipcBase: 152.8 },
  { anio: "2023", smmlv: 1160000, auxilio: 140606, ipcBase: 167.0 },
  { anio: "2024", smmlv: 1300000, auxilio: 162000, ipcBase: 175.7 },
  { anio: "2025", smmlv: 1423500, auxilio: 200000, ipcBase: 184.9 },
  { anio: "2026", smmlv: 1750905, auxilio: 249095, ipcBase: 195.7 },
];

// Calcular SMMLV en pesos constantes de 2014
const dataWithReal = data.map((d) => ({
  ...d,
  total: d.smmlv + d.auxilio,
  smmlvReal: Math.round((d.smmlv / d.ipcBase) * 100),
}));

const smmlv2014 = dataWithReal[0].smmlvReal;
const smmlv2026 = dataWithReal[dataWithReal.length - 1].smmlvReal;
const aumentoReal = (((smmlv2026 - smmlv2014) / smmlv2014) * 100).toFixed(1);

export default function SalarioMinimoReal() {
  return (
    <ChartFrame
      number="Gráfica 2 · Salario mínimo"
      title="Salario mínimo mensual: nominal, con auxilio y en pesos reales (2014-2026)"
      description={`El SMMLV creció de $616.000 (2014) a $1.750.905 (2026): +184% nominal en 12 años. Pero descontando la inflación acumulada de esos años (~96%), el aumento real es de apenas ${aumentoReal}%. El auxilio de transporte, que se paga a quienes ganan hasta 2 SMMLV, subió de $72.000 a $249.095. La comparación honesta debe usar SMMLV + auxilio en ambos extremos, no solo en el reciente.`}
      source="Ministerio del Trabajo — Decretos anuales de fijación del SMMLV y auxilio de transporte. IPC dic-dic acumulado de DANE."
      legend={
        <>
          <LegendItem color={COLORS.emerald} label="SMMLV nominal" />
          <LegendItem color={COLORS.amber} label="Auxilio de transporte" />
          <LegendItem color={COLORS.rose} label="SMMLV real (base 2014)" shape="line" />
        </>
      }
    >
      <ResponsiveContainer width="100%" height={380}>
        <ComposedChart data={dataWithReal} margin={{ top: 30, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            angle={-30}
            textAnchor="end"
            height={45}
          />
          <YAxis
            yAxisId="left"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            domain={[0, 2100000]}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={11}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            domain={[500000, 950000]}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            labelStyle={tooltipLabelStyle}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                smmlv: "SMMLV",
                auxilio: "Auxilio",
                smmlvReal: "SMMLV real (base 2014)",
              };
              return [
                `$${Math.round(value).toLocaleString("es-CO")}`,
                labels[name] || name,
              ];
            }}
          />
          <Bar
            yAxisId="left"
            dataKey="smmlv"
            stackId="a"
            fill={COLORS.emerald}
            fillOpacity={0.85}
            radius={[0, 0, 0, 0]}
          />
          <Bar
            yAxisId="left"
            dataKey="auxilio"
            stackId="a"
            fill={COLORS.amber}
            fillOpacity={0.85}
            radius={[4, 4, 0, 0]}
          >
            <LabelList
              dataKey="total"
              position="top"
              formatter={(v: number) => `$${(v / 1_000_000).toFixed(2)}M`}
              style={{ fontSize: 9, fontWeight: 700, fill: "#171717" }}
            />
          </Bar>
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="smmlvReal"
            stroke={COLORS.rose}
            strokeWidth={3}
            dot={{ r: 4, fill: COLORS.rose }}
          />
        </ComposedChart>
      </ResponsiveContainer>

      <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50/50 p-3 text-xs text-rose-900 leading-relaxed">
        <strong>La afirmación "el salario mínimo se duplicó" es asimétrica.</strong>
        Comparación honesta SMMLV + auxilio:
        <ul class="mt-2 list-disc list-inside space-y-1">
          <li>2022: <strong>$1.117.172</strong> · 2026: <strong>$2.000.000</strong> = +79% nominal</li>
          <li>SMMLV en pesos constantes 2014: $616.000 → $895.000 = <strong>+45% real</strong> en 12 años</li>
        </ul>
        El aumento es real y significativo. Pero decir "se duplicó" mezcla dos
        cosas: el SMMLV puro (que aumentó 75%) y el ingreso mínimo con auxilio
        (que aumentó 79%). La cifra nominal no es "el doble" en ninguna forma.
      </div>
    </ChartFrame>
  );
}
