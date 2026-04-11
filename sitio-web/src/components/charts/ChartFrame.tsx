import type { ReactNode } from "react";

interface Props {
  number: string;
  title: string;
  description?: string;
  source?: string;
  children: ReactNode;
  legend?: ReactNode;
}

export default function ChartFrame({
  number,
  title,
  description,
  source,
  children,
  legend,
}: Props) {
  return (
    <div className="my-8 rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm">
      <div className="mb-5 sm:mb-6">
        <div className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
          {number}
        </div>
        <h3 className="mt-1 text-lg sm:text-xl font-bold text-neutral-900 leading-tight">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{description}</p>
        )}
      </div>
      {children}
      {(legend || source) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
          {legend}
          {source && (
            <div className="sm:ml-auto text-neutral-500 break-words">Fuente: {source}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function LegendItem({
  color,
  label,
  shape = "square",
}: {
  color: string;
  label: string;
  shape?: "square" | "circle" | "line";
}) {
  const shapeClass =
    shape === "circle"
      ? "rounded-full"
      : shape === "line"
      ? "h-0.5 w-4"
      : "rounded-sm";
  const sizeClass = shape === "line" ? "h-0.5 w-4" : "h-2.5 w-2.5";

  return (
    <div className="flex items-center gap-1.5">
      <div
        className={`${sizeClass} ${shapeClass}`}
        style={{ backgroundColor: color }}
      />
      <span className="text-neutral-700 font-medium">{label}</span>
    </div>
  );
}
