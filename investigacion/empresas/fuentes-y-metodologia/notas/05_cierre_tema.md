# Bitacora — Cierre del tema EMPRESAS

**Fecha:** 1 de junio de 2026

## Estado final

Los **7 capítulos** del tema Empresas están publicados y conectados al sitio.

| # | Capitulo | URL |
|---|---|---|
| 1 | ¿Cuántas empresas hay? | `/temas/empresas/01-conteo-fuentes/` |
| 2 | Cómo se clasifican | `/temas/empresas/02-clasificacion/` |
| 3 | Mipymes: el 99% que produce poco | `/temas/empresas/03-mipymes/` |
| 4 | Dónde están las empresas | `/temas/empresas/04-distribucion-regional/` |
| 5 | Nacen, mueren, sobreviven | `/temas/empresas/05-dinamica/` |
| 6 | El Colombia productivo: las que reportan | `/temas/empresas/06-supersociedades/` |
| 7 | Empresas y empleo (puente) | `/temas/empresas/07-empresas-y-empleo/` |

Build status: ✅ `npm run build` OK (22 paginas totales en el sitio, incluyendo empleo + estado-finanzas).

## Fuentes incorporadas en esta sesion

### Documentos descargados a `datasets/raw/`
- **Confecamaras** — 6 informes de Dinamica Empresarial (anuales 2021-2024 + H1 2024 y 2025)
- **Confecamaras** — Cartilla 17 "Nuevos hallazgos de supervivencia y crecimiento" (2024)
- **Confecamaras** — "Cancelaciones de empresas en Colombia: un analisis de sus particularidades"
- **SuperSociedades** — Base 1.000 empresas FY2023 (publicada en 2024)
- **SuperSociedades** — Base 1.000 empresas FY2024 (publicada en 2025) — la mas reciente
- **SuperSociedades** — Base 9.000 empresas (FY2021)
- **BBVA Research** — "Una mirada a las Mipymes en Colombia" (enero 2024)

### Fuentes de noticias / secundarias consultadas
- Radio Nacional / Confecamaras — distribucion regional RUES 2025
- Infobae, La Republica, El Colombiano — top 1000 SuperSociedades 2024

## Datos procesados (15 CSV en `processed/` y publicados en `sitio-web/public/data/empresas/`)

### Confecamaras / RUES
1. `creacion_empresas_anual_2020_2025.csv`
2. `creacion_empresas_por_sector_2024_2025.csv`
3. `creacion_empresas_por_subsector_2024_2025.csv`
4. `creacion_por_tamano_2025_H1.csv`
5. `stock_empresas_por_tamano_2024.csv`
6. `empresas_por_departamento_rues_2025.csv`
7. `supervivencia_5anos.csv` (cohorte 2017, fuente Cartilla 17)
8. `cancelaciones_caracteristicas.csv`

### SuperSociedades
9. `supersociedades_top1000_fy2023.csv` (base completa 1000 filas x 20 cols)
10. `supersociedades_top1000_fy2024.csv` (base completa, mas reciente)
11. `forma_juridica_top1000_supersociedades.csv` (FY2023)
12. `forma_juridica_top1000_fy2024.csv`
13. `macrosector_top1000_supersociedades.csv` (FY2023)
14. `macrosector_top1000_fy2024.csv`
15. `depto_top1000_supersociedades.csv` (FY2023)
16. `depto_top1000_fy2024.csv`
17. `top10_supersociedades_fy2024.csv`
18. `concentracion_top1000_fy2024.csv`

### Cruces empresas-empleo
19. `aporte_economico_por_tamano_2022.csv`
20. `empleo_por_tamano_2023.csv`

## Componentes React creados (12)

1. `ConteoFuentes.tsx` — barras comparando RUES vs DIAN vs CNE
2. `CreacionEmpresasAnual.tsx` — composed chart 2020-2025
3. `CreacionPorSector.tsx` — variacion por sector H1
4. `CreacionPorTamano.tsx` — asimetria del tamano de las nuevas
5. `FormaJuridica.tsx` — reinado SAS en top 1000
6. `MacrosectorTop1000.tsx` — conteo + ingresos por macrosector
7. `StockPorTamano.tsx` — pie del stock RUES 2024
8. `ParadojaMipymes.tsx` — barras horizontales con 4 dimensiones
9. `EmpleoPorTamano.tsx` — empleo total por tamano del empleador
10. `DistribucionRegional.tsx` — top 4 departamentos del RUES
11. `GrandesPorDepartamento.tsx` — top 12 departamentos en SuperSociedades
12. `Supervivencia.tsx` — supervivencia a 5 anos por categoria
13. `NatalidadMortalidad.tsx` — creadas vs canceladas 2020-2024
14. `Top10SuperSociedades.tsx` — podio de las 10 mas grandes
15. `ConcentracionPareto.tsx` — curva de concentracion del top 1000
16. `MacrosectorIngresoUtilidad.tsx` — ingresos y margen por macrosector
17. `EmpleoEmpresasPuente.tsx` — sintesis empresas-empleo

(17 componentes en total)

## Hallazgos clave consolidados

| Hallazgo | Cifra | Fuente |
|---|---|---|
| Stock RUES 2024 | 1.739.405 empresas | Confecamaras |
| Stock RUES 2025 | 1.805.564 empresas | Radio Nacional/Confecamaras |
| Stock por tamano (2024) | 91,8% micro · 6,1% peq · 1,6% med · 0,5% grandes | Confecamaras |
| Mipymes en PIB | ~40% del PIB | ACOPI/ANIF |
| Grandes en empleo formal | 47% del empleo formal nacional | BBVA con GEIH |
| Empleo en micros (informalidad) | 94% del empleo informal nacional | BBVA con GEIH |
| Concentracion top 1000 | Top 50 = 42% ingresos · Top 100 = 52% | SuperSociedades FY2024 |
| Top 1000 ingresos totales | $1.183 billones COP en 2024 | SuperSociedades |
| Supervivencia a 5 anos (sociedades) | 47,1% | Confecamaras Cartilla 17 |
| Supervivencia a 5 anos (personas naturales) | 30,9% | Confecamaras Cartilla 17 |
| Supervivencia a 5 anos (grandes vs micros) | 72,7% vs 34,4% | Confecamaras Cartilla 17 |
| Cancelaciones 2017-2023 | 1.509.111 acumuladas (~215K/ano) | Confecamaras |
| Distribucion regional | Bogota 23,7% · Antioquia 13,8% · Valle 8,8% · Cundinamarca 6,7% | RUES 2025 |
| Concentracion grandes en Bogota | 48% de las top 1000, 59% de los ingresos | SuperSociedades FY2024 |

## Gaps que dejo abiertos (pendientes futuros)

- **DIAN RUT**: no se logro descarga masiva publica. Solo cifras citadas en literatura secundaria.
- **CNE 2021 microdatos**: aun no publicados por DANE (estimado mayo-junio 2026, justo ahora). Se usaron cifras del comunicado oficial.
- **Datos por departamento del UNIVERSO de empresas** (no solo top 1000): solo se tiene los porcentajes de los 4 mayores; los 29 restantes no se han desagregado.
- **PILA por tamano del empleador**: no se cruzo formalmente con RUES por NIT. Las cifras de empleo formal por tamano vienen del proxy GEIH via BBVA.

## Validacion final

- Build estatico: 22 paginas (incluye empleo + empresas + estado-finanzas)
- Smoke test dev server: las 9 rutas del tema empresas + home retornan 200
- 6 CSVs probados (200): concentracion, supervivencia, top10, departamentos, macrosector, depto top 1000
- Sin errores de linter (warning de Legend resuelto)

Tema cerrado.
