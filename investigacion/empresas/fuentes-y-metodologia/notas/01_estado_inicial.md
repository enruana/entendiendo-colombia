# Bitacora — Estado inicial de la investigacion

**Fecha:** 1 de junio de 2026

## Lo que se hizo

1. **Estructura espejo creada** en `investigacion/empresas/` (datasets/raw, datasets/processed, fuentes-y-metodologia/reportes, notas).
2. **Tema registrado** en `sitio-web/src/lib/temas.ts` con `available: false`. Slug: `empresas`. Color: violet. 7 capitulos definidos.
3. **FUENTES.md** redactado con verificacion HTTP de 13 URLs de fuentes oficiales (Confecamaras, RUES, DIAN, DANE CNE, DANE EAM/EAC/EAS, SuperSociedades, MinCIT, Microdatos DANE). 11 de 13 retornan 200 OK.
4. **7 reportes metodologicos** escritos (a..g) en `fuentes-y-metodologia/reportes/`, uno por capitulo, con hipotesis, datos necesarios, graficas previstas, riesgos y lectura clave.
5. **Confecamaras descargado**: 6 PDFs de la serie Dinamica Empresarial (2021, 2022, 2023, 2024 anuales + 2024 H1 + 2025 H1). El reporte 2025 anual y Q1 2026 no estan disponibles publicamente todavia.
6. **3 datasets procesados** creados en CSV:
   - `creacion_empresas_anual_2020_2025.csv`
   - `creacion_empresas_por_sector_2024_2025.csv`
   - `creacion_empresas_por_subsector_2024_2025.csv`

## Hallazgos preliminares clave

### Stock empresarial (RUES)
- 2023: 1.733.636 empresas activas
- 2024: 1.739.405 empresas activas (+0,3%)
- Crecimiento neto anual de solo ~5.000 empresas pese a constituirse ~300 mil al ano: la mortalidad y no-renovacion casi igualan la natalidad.

### Creacion anual de empresas
- 2020: 278.302 (pandemia)
- 2021: 307.679 (+10,6%)
- 2022: 310.731 (+1,0%) — pico de la serie
- 2023: 305.997 (-1,5%)
- 2024: 297.475 (-2,8%) — caida sostenida
- 2025 H1: 173.907 (+1,9% vs H1 2024) — leve recuperacion

### Composicion 2025 H1
- 74% personas naturales / 26% sociedades
- **99,7% son microempresas** (173.450 de 173.907)
- Pequenas: 437 · Medianas: 17 · Grandes: 3
- Solo 3 grandes empresas creadas en seis meses en todo el pais — concentrar la atencion en numero de empresas creadas oculta esta asimetria

### Sectores 2025 H1 (variacion vs 2024 H1)
- Crecen: Agricultura (+16%), Comercio (+3,3%), Servicios (+1,9%)
- Caen: Construccion (-8,2%), Industria (-3,2%)

### Supervivencia (estudios Confecamaras)
- Sociedades: 44% sobreviven a 5 anos
- Personas naturales: 30% sobreviven a 5 anos
- Movilidad (cambio de tamano): sociedades 18%, personas naturales 0,7%

### Empleo generado por nuevas empresas
- 2024: 45% de las nuevas empresas crearon al menos 1 empleo
- 2025 H1: 44% (estable)
- Distribucion del empleo nuevo: 38-39% comercio, 17% alojamiento y comida, 10% manufactura, 6% actividades profesionales

## Gaps de informacion

1. **Distribucion regional**: Los informes anuales no tienen tablas por departamento. Hay que buscar:
   - Camara de Comercio de Bogota (CCB) — boletines especificos
   - Tablero RUES de consulta publica
   - DANE Censo Economico 2021 para datos por municipio
2. **Datos de tamano por ingresos (Decreto 957)**: los informes usan criterio de activos historico. Hay que buscar otra fuente para usar el criterio actual.
3. **CNE 2021 anexos**: pendiente descargar.
4. **SIREM / SuperSociedades**: pendiente descargar.
5. **DIAN RUT**: pendiente descargar.

## Siguiente paso recomendado

Antes de seguir descargando, validar con el usuario:
- Outline confirmado?
- Capitulos en orden correcto?
- Algun angulo prioritario para empezar a construir el sitio (capitulo 1 primero)?

Una vez confirmado, fase 2: descargar CNE 2021 anexos y SuperSociedades, luego empezar a construir el capitulo 1 (conteo y fuentes) del sitio.
