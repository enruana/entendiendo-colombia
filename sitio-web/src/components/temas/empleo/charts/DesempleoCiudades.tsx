import { useEffect, useState } from "react";
import ChartFrame from "../../../charts/ChartFrame";

// Datos del boletin GEIH sep-nov 2025 extraidos del PDF del DANE
const cityData = [
  { ciudad: "Quibdo", td: 24.6 },
  { ciudad: "Cartagena", td: 14.6 },
  { ciudad: "Riohacha", td: 13.6 },
  { ciudad: "Cucuta A.M.", td: 12.6 },
  { ciudad: "Ibague", td: 12.4 },
  { ciudad: "Sincelejo", td: 11.6 },
  { ciudad: "Armenia", td: 11.4 },
  { ciudad: "Tunja", td: 11.2 },
  { ciudad: "Popayan", td: 10.8 },
  { ciudad: "Monteria", td: 10.2 },
  { ciudad: "Santa Marta", td: 10.0 },
  { ciudad: "Valledupar", td: 9.6 },
  { ciudad: "Pasto", td: 9.6 },
  { ciudad: "Bucaramanga A.M.", td: 9.1 },
  { ciudad: "Pereira A.M.", td: 9.1 },
  { ciudad: "Florencia", td: 9.0 },
  { ciudad: "Barranquilla A.M.", td: 8.7 },
  { ciudad: "Neiva", td: 8.5 },
  { ciudad: "Cali A.M.", td: 8.2 },
  { ciudad: "Medellin A.M.", td: 8.0 },
  { ciudad: "Villavicencio", td: 7.7 },
  { ciudad: "Manizales A.M.", td: 7.7 },
  { ciudad: "Bogota D.C.", td: 7.5 },
];

export default function DesempleoCiudades() {
  const sorted = [...cityData].sort((a, b) => b.td - a.td);
  const maxTD = Math.max(...sorted.map((d) => d.td));
  const minTD = Math.min(...sorted.map((d) => d.td));
  const avgTD = sorted.reduce((s, d) => s + d.td, 0) / sorted.length;

  const getColor = (td: number) => {
    if (td < 8.5) return "#10b981";
    if (td < 10) return "#22c55e";
    if (td < 11) return "#eab308";
    if (td < 13) return "#f59e0b";
    if (td < 15) return "#ef4444";
    return "#e11d48";
  };

  return (
    <ChartFrame
      number="Grafica 2 · Ranking"
      title="Tasa de desempleo por ciudad (trimestre nov 2025-ene 2026)"
      description={`Mientras Bogota, Medellin y Villavicencio tienen desempleo cerca del 7.5-8%, Quibdo supera el 24%. Brecha maxima: ${(maxTD - minTD).toFixed(1)} puntos.`}
      source="DANE — Boletin GEIH enero 2026"
    >
      <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-2">
        {sorted.map((d) => {
          const widthPct = (d.td / 30) * 100;
          const color = getColor(d.td);
          return (
            <div key={d.ciudad} className="group flex items-center gap-2 sm:gap-3">
              <div className="w-24 sm:w-36 flex-shrink-0 text-right text-xs sm:text-sm font-medium text-neutral-700 truncate">
                {d.ciudad}
              </div>
              <div className="flex-1 relative h-7 min-w-0">
                <div className="absolute inset-0 rounded-md bg-neutral-100"></div>
                <div
                  className="absolute inset-y-0 left-0 rounded-md transition-all duration-500 group-hover:brightness-110"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: color,
                  }}
                >
                  <div className="absolute inset-y-0 right-1.5 sm:right-2 flex items-center">
                    <span className="text-[10px] sm:text-xs font-bold text-white drop-shadow-sm">
                      {d.td.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}
