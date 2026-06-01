# Bitacora — Fase 2 + Capitulo 1 montado

**Fecha:** 1 de junio de 2026

## Fase 2 — Descargas realizadas

### SuperSociedades
- `Base-1000-empresas-2023.xlsx` (351 KB) — top 1000 por ingresos, ano fiscal 2022
- `Base-1000-empresas-2024.xlsx` (330 KB) — top 1000 por ingresos, ano fiscal 2023 (33 columnas)
- `Base-9000-empresas.xlsx` (1,6 MB) — ~9.000 empresas vigiladas con estados financieros
- Cobertura confirmada de columnas: Ranking, NIT, Razon Social, Region, Departamento, Ciudad, CIIU, Macrosector, Ingresos Operacionales

### CNE DANE 2021
- Microdatos NO publicados todavia (estimado mayo-junio 2026)
- Tablero interactivo en censoeconomiconacionalurbano.dane.gov.co
- Cifra de comunicado: 2,58M unidades economicas (2,1M establecimientos fijos + 240k viviendas con actividad + 89k semi-fijos + 103k moviles)

### DIAN RUT
- DIAN no expone descarga masiva publica
- Las cifras se citan en informes secundarios; pendiente revisar Datos Abiertos Colombia con filtro especifico

## Capitulo 1 — Montado

### Archivos creados

**Componentes (3):**
- `sitio-web/src/components/temas/empresas/charts/ConteoFuentes.tsx` — bar chart comparando RUES vs DIAN vs CNE
- `sitio-web/src/components/temas/empresas/charts/CreacionEmpresasAnual.tsx` — composed chart (barras + lineas) 2020-2025
- `sitio-web/src/components/temas/empresas/charts/CreacionPorSector.tsx` — barras horizontales con variacion por sector

**Paginas (2):**
- `sitio-web/src/pages/temas/empresas/index.astro` — landing del tema
- `sitio-web/src/pages/temas/empresas/01-conteo-fuentes.astro` — capitulo 1 completo

**Datos (3 CSV en public/data/empresas/):**
- `creacion_empresas_anual_2020_2025.csv`
- `creacion_empresas_por_sector_2024_2025.csv`
- `creacion_empresas_por_subsector_2024_2025.csv`

### Registro en lib/temas.ts
- Cambiado `available: false` a `available: true`
- El tema aparece en la home de "Entendiendo Colombia"

### Build y smoke test
- `npm run build` — OK, 15 paginas generadas
- Dev server smoke test:
  - GET `/temas/empresas/` -> 200
  - GET `/temas/empresas/01-conteo-fuentes/` -> 200
  - GET `/data/empresas/creacion_empresas_anual_2020_2025.csv` -> 200

## Estado de capitulos del tema

| # | Capitulo | Estado |
|---|---|---|
| 1 | Conteo y fuentes | Publicado |
| 2 | Clasificacion | Pendiente |
| 3 | Mipymes | Pendiente |
| 4 | Distribucion regional | Pendiente |
| 5 | Dinamica natalidad/mortalidad | Pendiente |
| 6 | SuperSociedades | Pendiente |
| 7 | Empresas y empleo | Pendiente |

## Pendientes para fase 3

1. Procesar Base-1000-empresas-2024.xlsx a CSV (sera la base del capitulo 6)
2. Encontrar datos por departamento (probable fuente: tableros RUES o CCB)
3. Buscar datos de supervivencia empresarial detallados de Confecamaras
4. Construir capitulos 2-7 progresivamente
