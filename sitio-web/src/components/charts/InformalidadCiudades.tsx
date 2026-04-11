import { useEffect, useState } from "react";
import ChartFrame from "./ChartFrame";

interface CityData {
  ciudad: string;
  valor: number;
}

export default function InformalidadCiudades() {
  const [data, setData] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/informalidad_por_ciudad_trimestre_movil_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        const headers = lines[0].split(",");
        // Take the last row (most recent trimestre movil: sep-nov 2025)
        const lastRow = lines[lines.length - 1].split(",");

        const result: CityData[] = [];
        for (let i = 1; i < headers.length; i++) {
          const ciudad = headers[i].trim();
          const valor = Number(lastRow[i]);
          // Skip aggregate rows
          if (
            !ciudad ||
            ciudad === "Total nacional" ||
            ciudad === "13 Ciudades y A.M." ||
            ciudad === "23 Ciudades y A.M." ||
            isNaN(valor)
          ) {
            continue;
          }
          result.push({ ciudad, valor });
        }

        // Sort from highest to lowest
        result.sort((a, b) => b.valor - a.valor);
        setData(result);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando datos de ciudades...</div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((d) => d.valor));
  const avgValue = data.reduce((sum, d) => sum + d.valor, 0) / data.length;

  const getColor = (value: number) => {
    // Gradient de emerald (bajo) a rose (alto)
    if (value < 40) return "#10b981"; // emerald
    if (value < 45) return "#22c55e"; // green
    if (value < 50) return "#eab308"; // yellow
    if (value < 55) return "#f59e0b"; // amber
    if (value < 60) return "#f97316"; // orange
    if (value < 65) return "#ef4444"; // red
    return "#e11d48"; // rose
  };

  return (
    <ChartFrame
      number="Grafica 1 · Interactiva"
      title="Informalidad por ciudad (trimestre sep-nov 2025)"
      description={`23 ciudades ordenadas de mayor a menor informalidad. Promedio: ${avgValue.toFixed(1)}%. Brecha entre la peor y la mejor: ${(maxValue - data[data.length - 1].valor).toFixed(1)} puntos porcentuales.`}
      source="DANE — GEIH Ocupacion Informal, trimestre movil sep-nov 2025"
    >
      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {data.map((d, i) => {
          const widthPct = (d.valor / 75) * 100;
          const color = getColor(d.valor);
          return (
            <div key={d.ciudad} className="group">
              <div className="flex items-center gap-3">
                <div className="w-36 flex-shrink-0 text-right text-sm font-medium text-neutral-700 truncate">
                  {d.ciudad}
                </div>
                <div className="flex-1 relative h-8">
                  <div className="absolute inset-0 rounded-md bg-neutral-100"></div>
                  <div
                    className="absolute inset-y-0 left-0 rounded-md transition-all duration-500 group-hover:brightness-110"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: color,
                    }}
                  >
                    <div className="absolute inset-y-0 right-2 flex items-center">
                      <span className="text-xs font-bold text-white drop-shadow-sm">
                        {d.valor.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <div className="flex items-center gap-2">
          <span>Menor informalidad</span>
          <div className="flex">
            {["#10b981", "#eab308", "#f59e0b", "#ef4444", "#e11d48"].map((c) => (
              <div key={c} className="h-3 w-6" style={{ backgroundColor: c }}></div>
            ))}
          </div>
          <span>Mayor informalidad</span>
        </div>
      </div>
    </ChartFrame>
  );
}
