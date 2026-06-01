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
  {
    slug: "empresas",
    nombre: "Empresas en Colombia",
    tagline: "Quiénes producen, dónde están y cuántas duran",
    descripcion:
      "Recorrido por el tejido empresarial colombiano: cuántas empresas hay (RUES, DIAN y Censo Económico dan tres cifras distintas), cómo se clasifican, dónde se concentran, cuántas nacen y mueren cada año, y qué pasa con las ~30 mil empresas que sí reportan estados financieros a SuperSociedades. Datos de Confecámaras, DANE, DIAN y SuperSociedades.",
    icono: "🏢",
    color: "violet",
    available: true,
    capitulos: [
      {
        numero: 1,
        slug: "01-conteo-fuentes",
        titulo: "¿Cuántas empresas hay?",
        descripcion:
          "RUES, DIAN y Censo Económico cuentan cosas distintas. Por qué la cifra que cites cambia el debate.",
        accentColor: "violet",
      },
      {
        numero: 2,
        slug: "02-clasificacion",
        titulo: "Cómo se clasifican",
        descripcion:
          "Tamaño (Decreto 957/2019), forma jurídica (SAS, SA, Ltda) y actividad económica (CIIU). La taxonomía que ordena todo.",
        accentColor: "indigo",
      },
      {
        numero: 3,
        slug: "03-mipymes",
        titulo: "Mipymes: el 99% que produce poco",
        descripcion:
          "Las micro son el 92% del tejido pero generan menos del 10% de las ventas. La paradoja del tamaño en Colombia.",
        accentColor: "amber",
      },
      {
        numero: 4,
        slug: "04-distribucion-regional",
        titulo: "Dónde están las empresas",
        descripcion:
          "Bogotá, Antioquia y Valle concentran la mitad del tejido empresarial. El mapa de la desigualdad regional.",
        accentColor: "cyan",
      },
      {
        numero: 5,
        slug: "05-dinamica",
        titulo: "Nacen, mueren, sobreviven",
        descripcion:
          "Cuántas empresas se crean cada año, cuántas cierran y por qué solo una de cada tres sobrevive a los cinco años.",
        accentColor: "rose",
      },
      {
        numero: 6,
        slug: "06-supersociedades",
        titulo: "El Colombia productivo: las que reportan",
        descripcion:
          "Las ~30 mil empresas que envían estados financieros a SuperSociedades concentran la mayoría de la producción formal del país.",
        accentColor: "sky",
      },
      {
        numero: 7,
        slug: "07-empresas-y-empleo",
        titulo: "Empresas y empleo",
        descripcion:
          "Cuántos empleos genera cada tamaño y sector. El puente con el tema de empleo y mercado laboral.",
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
