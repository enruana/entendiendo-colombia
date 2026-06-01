import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface Row {
  anio: string;
  nacimientos: number | null;
  defunciones: number | null;
}

export default function NacimientosDefunciones() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empleo/nacimientos_defunciones_2015_2024.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const rows: Row[] = lines
          .slice(1)
          .map((line) => {
            const [anio, nac, def] = line.split(",");
            return {
              anio: anio.replace("pr", ""),
              nacimientos: nac ? Number(nac) : null,
              defunciones: def ? Number(def) : null,
            };
          })
          .filter((r) => r.nacimientos !== null);
        setData(rows);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos del DANE...</div>
      </div>
    );
  }

  const formatK = (n: number) => `${Math.round(n / 1000)}K`;
  const formatFull = (n: number) => n.toLocaleString("es-CO");

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Gráfica 2
        </div>
        <h3 className="mt-1 text-xl font-bold text-neutral-900">
          Nacimientos y muertes en Colombia, 2015-2024
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          Los nacimientos cayeron <strong>31.3%</strong> en una década. Las muertes
          tuvieron un pico en 2020-2021 por COVID y luego se normalizaron.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          barCategoryGap="20%"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={formatK}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e5e5",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "13px",
            }}
            labelStyle={{
              fontWeight: 600,
              color: "#171717",
              marginBottom: "4px",
            }}
            cursor={{ fill: "#f5f5f5" }}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                nacimientos: "Nacimientos",
                defunciones: "Muertes",
              };
              return [formatFull(value), labels[name] || name];
            }}
          />
          <Bar
            dataKey="nacimientos"
            fill="#6366f1"
            name="nacimientos"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="defunciones"
            fill="#ec4899"
            name="defunciones"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-indigo-500"></div>
          <span className="text-neutral-700 font-medium">Nacimientos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm bg-pink-500"></div>
          <span className="text-neutral-700 font-medium">Muertes</span>
        </div>
        <div className="ml-auto text-neutral-500">
          Fuente: DANE — Estadísticas Vitales
        </div>
      </div>
    </div>
  );
}
