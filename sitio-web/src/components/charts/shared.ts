// Utilidades compartidas para las graficas

export const COLORS = {
  indigo: "#6366f1",
  violet: "#8b5cf6",
  pink: "#ec4899",
  cyan: "#06b6d4",
  amber: "#f59e0b",
  emerald: "#10b981",
  rose: "#f43f5e",
  sky: "#0ea5e9",
  slate: "#64748b",
};

export const tooltipStyle = {
  backgroundColor: "white",
  border: "1px solid #e5e5e5",
  borderRadius: "0.75rem",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  fontSize: "13px",
};

export const tooltipLabelStyle = {
  fontWeight: 600,
  color: "#171717",
  marginBottom: "4px",
};

export function formatNumber(n: number): string {
  if (Math.abs(n) >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (Math.abs(n) >= 1_000) return `${Math.round(n / 1000)}K`;
  return n.toString();
}

export function formatFull(n: number): string {
  return n.toLocaleString("es-CO");
}

export function formatPercent(n: number): string {
  return `${n.toFixed(1)}%`;
}

// Parse CSV simple (asume que no hay comas dentro de valores)
export function parseCSV(text: string): Record<string, string>[] {
  const lines = text.trim().split("\n");
  const headers = lines[0].split(",").map((h) => h.trim());
  return lines.slice(1).map((line) => {
    const values = line.split(",");
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] ?? "";
    });
    return row;
  });
}

export async function loadCSV(path: string): Promise<Record<string, string>[]> {
  const res = await fetch(path);
  const text = await res.text();
  return parseCSV(text);
}

// Componente de loading consistente
export function LoadingCard({ height = 400 }: { height?: number }) {
  return null; // handled inline in each chart
}
