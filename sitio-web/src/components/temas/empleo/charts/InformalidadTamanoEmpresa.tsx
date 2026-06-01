import { useEffect, useState } from "react";
import ChartFrame from "../../../charts/ChartFrame";

interface Bracket {
  label: string;
  total: number;
  formales: number;
  informales: number;
  pctInformal: number;
  color: string;
}

export default function InformalidadTamanoEmpresa() {
  const [data, setData] = useState<Bracket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/empleo/informalidad_por_tamano_empresa_2021_2025.csv")
      .then((r) => r.text())
      .then((csv) => {
        const lines = csv.trim().split("\n");
        // Take last row (most recent trimester: sep-nov 2025)
        const last = lines[lines.length - 1].split(",");
        // Cols (per earlier extraction):
        // [0] trim, [1] Total, [2] Micro_total, [3] Peq_total, [4] Med_total, [5] Grande_total,
        // [6] Total_formales, [7] Micro_formal, [8] Peq_formal, [9] Med_formal, [10] Grande_formal,
        // [11] Total_informales, [12] Micro_informal, [13] Peq_informal, [14] Med_informal, [15] Grande_informal

        const build = (label: string, total: number, formal: number, informal: number, color: string): Bracket => ({
          label,
          total,
          formales: formal,
          informales: informal,
          pctInformal: total > 0 ? (informal / total) * 100 : 0,
          color,
        });

        const brackets: Bracket[] = [
          build("Microempresa (hasta 10)", Number(last[2]), Number(last[7]), Number(last[12]), "#e11d48"),
          build("Pequena (11-50)", Number(last[3]), Number(last[8]), Number(last[13]), "#f59e0b"),
          build("Mediana (51-200)", Number(last[4]), Number(last[9]), Number(last[14]), "#22c55e"),
          build("Grande (+200)", Number(last[5]), Number(last[10]), Number(last[15]), "#10b981"),
        ];
        setData(brackets);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-neutral-200 bg-neutral-50">
        <div className="text-sm text-neutral-500">Cargando...</div>
      </div>
    );
  }

  return (
    <ChartFrame
      number="Grafica 2"
      title="Informalidad por tamano de empresa"
      description="El tamano de la empresa es el predictor mas fuerte de formalidad. En microempresas, 84% son informales. En grandes, solo 2%."
      source="DANE — GEIH, trimestre sep-nov 2025"
    >
      <div className="space-y-4">
        {data.map((b) => (
          <div key={b.label} className="rounded-xl border border-neutral-200 bg-white p-4">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="text-sm font-bold text-neutral-900">{b.label}</div>
                <div className="text-xs text-neutral-500 mt-0.5">
                  {Math.round(b.total).toLocaleString("es-CO")} mil trabajadores
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-extrabold font-mono" style={{ color: b.color }}>
                  {b.pctInformal.toFixed(1)}%
                </div>
                <div className="text-xs text-neutral-500">informales</div>
              </div>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className="h-full transition-all"
                style={{
                  width: `${b.pctInformal}%`,
                  backgroundColor: b.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </ChartFrame>
  );
}
