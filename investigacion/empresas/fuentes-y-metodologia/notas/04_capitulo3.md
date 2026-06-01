# Bitacora — Capitulo 3 (Mipymes: el 99% que produce poco)

**Fecha:** 1 de junio de 2026

## Fuente nueva incorporada

- BBVA Research (enero 2024): *Una mirada a las mipymes en Colombia*. Documento de 70+ paginas con cifras agregadas.
  - Descargado a: `raw/banrep/bbva_mipymes_colombia_2024.pdf`
  - Extraido a texto en /tmp para parsing
  - Citas clave verificadas literalmente del PDF (no inferidas)

## Datos procesados (3 CSV nuevos)

- `stock_empresas_por_tamano_2024.csv` — 4 filas con distribucion completa del stock RUES 2024 por tamano (Confecamaras: 1.593.103 micro, 106.120 peq, 27.238 med, 8.175 grandes — 1.734.636 total)
- `aporte_economico_por_tamano_2022.csv` — 4 dimensiones (empresas / PIB / empleo formal / empleo total) con split mipymes vs grandes
- `empleo_por_tamano_2023.csv` — distribucion del empleo total y notas de formalidad por segmento

## Hallazgos clave del capitulo 3

### La paradoja del 99%
| Dimension | Mipymes | Grandes |
|---|---|---|
| Empresas | 99,5% | 0,5% |
| PIB | ~40% | ~60% |
| Empleo formal | 53% | 47% |
| Empleo total | 79% | 21% |

### Calculo derivado
- Cada empresa grande aporta en promedio ~250x mas al PIB que una mipyme tipica
- Las micros generan el 94% del empleo informal nacional
- Dentro de las micros, solo el 15% del empleo es formal

### Cinco factores estructurales detras de la baja productividad mipyme
1. Sectores de baja escalabilidad (comercio detal, servicios personales)
2. Acceso restringido al credito
3. Carga regulatoria que penaliza crecer (incentivo en contra del transito de tamano)
4. Baja formacion del empresario (emprendimiento de necesidad)
5. Acceso restringido a mercados grandes (exportaciones + compras publicas)

## Archivos creados

### Componentes (3)
- `StockPorTamano.tsx` — Pie chart con distribucion del stock RUES 2024
- `ParadojaMipymes.tsx` — Barras horizontales apiladas con 4 dimensiones (la paradoja en 1 grafico)
- `EmpleoPorTamano.tsx` — Barras verticales con % del empleo total por tamano del empleador

### Pagina
- `sitio-web/src/pages/temas/empresas/03-mipymes.astro` — capitulo completo

### Landing
- `builtSlugs` actualizado para incluir `03-mipymes`

## Validacion

- `npm run build`: OK, 17 paginas (+1 nueva).
- Smoke test dev server: GET `/temas/empresas/03-mipymes/` → 200, CSVs nuevos → 200.

## Lecciones aplicadas

- BBVA Research no desagrega el split formal/informal dentro de pymes. Resisti la tentacion
  de "inferir" cifras de cross-tab y mantuve la nota literal del documento (15%/85% solo
  en micros). Mejor honesto que falsamente preciso.
- El uso de cuatro stat cards grandes (91,8/6,1/1,6/0,5) en HTML estatico antes del Pie
  chart hace que el numero se "lea" antes de la geometria.
