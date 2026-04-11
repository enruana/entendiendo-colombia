# Empleo Colombia — Sitio Web

Sitio web educativo que explica el mercado laboral colombiano paso a paso,
con graficas interactivas, datos oficiales y metodologia transparente.

## Stack

- **Framework**: [Astro 5](https://astro.build) (SSG con islas React)
- **UI**: [React 18](https://react.dev) + [Tailwind CSS v4](https://tailwindcss.com)
- **Graficas**: [Recharts](https://recharts.org)
- **Tipografia**: Inter (Google Fonts)
- **Hosting**: Cloudflare Pages

## Estructura

```
sitio-web/
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── public/
│   ├── favicon.svg
│   └── data/               <-- CSVs copiados desde fase-02-datasets/processed/
├── src/
│   ├── layouts/
│   │   ├── Base.astro      <-- Layout con header/footer
│   │   └── Chapter.astro   <-- Layout de capitulos con progress bar y navegacion
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── ui/
│   │   │   ├── StatCard.astro
│   │   │   ├── ChapterCard.astro
│   │   │   └── Callout.astro
│   │   └── charts/
│   │       ├── PoblacionColombia.tsx
│   │       ├── NacimientosDefunciones.tsx
│   │       └── PiramidePoblacional.tsx
│   ├── pages/
│   │   ├── index.astro          <-- Landing
│   │   ├── empezar-aqui.astro
│   │   ├── glosario.astro
│   │   ├── datos.astro
│   │   ├── fuentes.astro
│   │   └── capitulos/
│   │       └── 01-demografia.astro
│   └── styles/
│       └── global.css       <-- Sistema de diseno (colores, tipografia, gradientes)
└── README.md
```

## Desarrollo local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo en http://localhost:4321
npm run dev

# Compilar para produccion
npm run build

# Preview del build
npm run preview
```

## Deployment

El sitio esta configurado para deployarse en Cloudflare Pages:

1. Conecta el repo a Cloudflare Pages
2. Configura el build command: `cd sitio-web && npm install && npm run build`
3. Output directory: `sitio-web/dist`
4. Listo

## Actualizacion de datos

Cuando el DANE publique nuevos datos:

1. Actualiza los Excel en `fase-02-datasets/raw/`
2. Corre los scripts de conversion para regenerar los CSVs en `fase-02-datasets/processed/`
3. Copia los CSVs actualizados a `sitio-web/public/data/`
4. Haz commit y push — Cloudflare Pages redesplega automaticamente

## Filosofia del diseno

Estetica inspirada en Stripe/Linear/Vercel:
- Gradientes vibrantes (indigo → violet → pink)
- Tipografia Inter con caracteristicas editoriales
- Mucho whitespace
- Sombras suaves
- Interactividad mesurada (no abrumadora)
- Mobile-first responsive

## Accesibilidad

- Contraste AA en todos los textos
- Navegacion via teclado
- Semantica HTML apropiada
- Lang="es" en todas las paginas
- Alt text en imagenes (cuando las haya)

## Licencia

Contenido bajo Creative Commons BY 4.0. Los datos son propiedad de sus fuentes
originales (DANE, UGPP, etc).
