// Manifiesto declarativo de temas de "Entendiendo Colombia".
// Agregar un tema nuevo: crear carpeta pages/temas/<slug>/ y components/temas/<slug>/,
// y registrar el tema en TEMAS[]. La home y las landings derivan de aqui.

export type AccentColor =
  | "indigo"
  | "violet"
  | "pink"
  | "cyan"
  | "amber"
  | "emerald"
  | "rose"
  | "sky";

export interface Capitulo {
  numero: number;
  slug: string;          // segmento de URL (ej. "03-empleo-formal")
  titulo: string;
  descripcion: string;
  accentColor: AccentColor;
}

export interface Tema {
  slug: string;          // segmento de URL (ej. "empleo")
  nombre: string;        // titulo corto para cards y nav
  tagline: string;       // una linea para la card
  descripcion: string;   // parrafo para la landing del tema
  icono: string;         // emoji
  color: AccentColor;    // color principal del tema
  available: boolean;    // false => card visible pero deshabilitada
  capitulos: Capitulo[];
}

export const TEMAS: Tema[] = [
  {
    slug: "empleo",
    nombre: "Empleo y mercado laboral",
    tagline: "Cuántos trabajan, cuántos no, y por qué depende de a quién le preguntes",
    descripcion:
      "Recorrido en 7 capítulos por el mercado laboral colombiano: demografía, clasificación de la población, fuentes oficiales (GEIH vs PILA), empleo formal e informal, desempleo, población inactiva y calidad del empleo. Datos del DANE y la UGPP, con metodología transparente.",
    icono: "💼",
    color: "indigo",
    available: true,
    capitulos: [
      {
        numero: 1,
        slug: "01-demografia",
        titulo: "¿Cuántos colombianos hay?",
        descripcion:
          "Población, nacimientos, muertes y migración. El contexto demográfico que todo lo explica.",
        accentColor: "indigo",
      },
      {
        numero: 2,
        slug: "02-clasificacion",
        titulo: "Cómo se divide la población",
        descripcion:
          "Quiénes trabajan, quiénes buscan trabajo, y los 14,9 millones que no aparecen en ningún titular.",
        accentColor: "violet",
      },
      {
        numero: 3,
        slug: "03-empleo-formal",
        titulo: "Empleo formal: dos fuentes, dos verdades",
        descripcion:
          "GEIH y PILA dan números distintos. Entendemos por qué y cuál usar cuándo.",
        accentColor: "cyan",
      },
      {
        numero: 4,
        slug: "04-empleo-informal",
        titulo: "Empleo informal",
        descripcion:
          "13 millones de colombianos trabajan sin protección social. Por qué y quiénes son.",
        accentColor: "rose",
      },
      {
        numero: 5,
        slug: "05-desempleo",
        titulo: "Desempleo",
        descripcion:
          "La tasa está en mínimos históricos. Pero es engañosa. Por qué y cómo leerla.",
        accentColor: "pink",
      },
      {
        numero: 6,
        slug: "06-poblacion-inactiva",
        titulo: "Los invisibles: la PEI",
        descripcion:
          "14,9 millones de personas que no trabajan ni buscan trabajo. La mayoría son mujeres. Por qué.",
        accentColor: "sky",
      },
      {
        numero: 7,
        slug: "07-calidad-empleo",
        titulo: "Calidad del empleo",
        descripcion:
          "Subempleo, brechas de género, NINIs, working poor. Más allá del número agregado.",
        accentColor: "emerald",
      },
    ],
  },
];

export function getTema(slug: string): Tema | undefined {
  return TEMAS.find((t) => t.slug === slug);
}

export function getCapituloHref(temaSlug: string, capSlug: string): string {
  return `/temas/${temaSlug}/${capSlug}`;
}

export function getCapituloNav(
  temaSlug: string,
  capNumero: number,
): {
  prev: { href: string; titulo: string } | null;
  next: { href: string; titulo: string } | null;
} {
  const tema = getTema(temaSlug);
  if (!tema) return { prev: null, next: null };
  const idx = tema.capitulos.findIndex((c) => c.numero === capNumero);
  if (idx === -1) return { prev: null, next: null };
  const prev =
    idx > 0
      ? {
          href: getCapituloHref(temaSlug, tema.capitulos[idx - 1].slug),
          titulo: tema.capitulos[idx - 1].titulo,
        }
      : null;
  const next =
    idx < tema.capitulos.length - 1
      ? {
          href: getCapituloHref(temaSlug, tema.capitulos[idx + 1].slug),
          titulo: tema.capitulos[idx + 1].titulo,
        }
      : null;
  return { prev, next };
}
