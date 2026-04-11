import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface Row {
  anio: number;
  poblacion_total: number;
  poblacion_cabecera: number;
  poblacion_centros_poblados_rural: number;
}

export default function PoblacionColombia() {
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/poblacion_colombia_2018_2070.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const headers = lines[0].split(",");
        const rows: Row[] = lines.slice(1).map((line) => {
          const values = line.split(",");
          return {
            anio: Number(values[0]),
            poblacion_total: Number(values[1]) || 0,
            poblacion_cabecera: Number(values[2]) || 0,
            poblacion_centros_poblados_rural: Number(values[3]) || 0,
          };
        });
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

  const formatNumber = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`;
    return n.toString();
  };

  const formatFull = (n: number) => n.toLocaleString("es-CO");

  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          Grafica 1
        </div>
        <h3 className="mt-1 text-xl font-bold text-neutral-900">
          Poblacion total de Colombia, 2018 a 2070
        </h3>
        <p className="mt-1 text-sm text-neutral-600">
          Proyecciones oficiales del DANE, desagregadas entre poblacion urbana
          (cabeceras municipales) y rural (centros poblados y disperso).
        </p>
      </div>

      <ResponsiveContainer width="100%" height={360}>
        <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUrbana" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="colorRural" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ec4899" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ec4899" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" vertical={false} />
          <XAxis
            dataKey="anio"
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            interval={4}
          />
          <YAxis
            stroke="#a3a3a3"
            tickLine={false}
            axisLine={false}
            fontSize={12}
            tickFormatter={formatNumber}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #e5e5e5",
              borderRadius: "0.75rem",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "13px",
            }}
            labelStyle={{ fontWeight: 600, color: "#171717", marginBottom: "4px" }}
            formatter={(value: number, name: string) => {
              const labels: Record<string, string> = {
                poblacion_cabecera: "Cabecera urbana",
                poblacion_centros_poblados_rural: "Centros poblados y rural",
                poblacion_total: "Total nacional",
              };
              return [formatFull(value), labels[name] || name];
            }}
          />
          <ReferenceLine
            x={2050}
            stroke="#ec4899"
            strokeDasharray="4 4"
            label={{
              value: "Pico ~2050",
              position: "top",
              fill: "#ec4899",
              fontSize: 11,
              fontWeight: 600,
            }}
          />
          <Area
            type="monotone"
            dataKey="poblacion_cabecera"
            stackId="1"
            stroke="#6366f1"
            strokeWidth={2}
            fill="url(#colorUrbana)"
            name="poblacion_cabecera"
          />
          <Area
            type="monotone"
            dataKey="poblacion_centros_poblados_rural"
            stackId="1"
            stroke="#ec4899"
            strokeWidth={2}
            fill="url(#colorRural)"
            name="poblacion_centros_poblados_rural"
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-indigo-500"></div>
          <span className="text-neutral-700 font-medium">Poblacion urbana</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-pink-500"></div>
          <span className="text-neutral-700 font-medium">Poblacion rural</span>
        </div>
        <div className="ml-auto text-neutral-500">
          Fuente: DANE — Proyecciones de poblacion nacional 2018-2070
        </div>
      </div>
    </div>
  );
}
