# Bitacora — Capitulo 2 (Clasificacion) montado

**Fecha:** 1 de junio de 2026

## Archivos creados

### Datos procesados (5 nuevos CSV)
- `supersociedades_top1000_fy2023.csv` (1000 filas, 20 columnas) — base completa con NIT, region, ciudad, CIIU, ingresos 2023 y 2022, activos, pasivos, patrimonio, grupo NIIF.
- `forma_juridica_top1000_supersociedades.csv` — distribucion por forma juridica inferida de razon social.
- `macrosector_top1000_supersociedades.csv` — distribucion por macrosector con conteo e ingresos.
- `depto_top1000_supersociedades.csv` — distribucion por departamento del domicilio.
- `creacion_por_tamano_2025_H1.csv` — empresas creadas en H1-2025 por tamano (Confecamaras).

### Componentes (3)
- `CreacionPorTamano.tsx` — barras con la asimetria del tamano. Etiqueta de tamano + variacion en tooltip.
- `FormaJuridica.tsx` — barras horizontales con SAS, SA, Ltda, ESP, etc. Color por forma juridica.
- `MacrosectorTop1000.tsx` — barras dobles: conteo (eje izquierdo) y % de ingresos (eje derecho), para mostrar la asimetria entre numero y peso.

### Pagina
- `sitio-web/src/pages/temas/empresas/02-clasificacion.astro` — capitulo completo con 3 secciones (tamano, forma juridica, CIIU) + 3 charts + tabla del Decreto 957 + ejemplo concreto.

### Landing actualizada
- `builtSlugs` incluye ahora `02-clasificacion` para activar el card.

## Hallazgos clave del capitulo 2

### Por tamano (Confecamaras H1-2025)
- Micro: 173.450 (99,74%)
- Pequena: 437 (0,25%)
- Mediana: 17 (0,01%)
- Grande: 3 (~0,00%)

### Por forma juridica (Top 1000 SuperSociedades FY2023, inferido de razon social)
- S.A.S: 488 (48,8%)
- S.A.: 290 (29,0%)
- Otros (sucursales extranjeras, fundaciones, cajas): 122 (12,2%)
- E.S.P: 47 (4,7%)
- Ltda: 46 (4,6%)
- S.C.A: 4 · BIC: 2 · Cooperativa: 1

### Por macrosector (Top 1000)
- Servicios: 312 empresas, $423.789 MM ingresos (28,9%)
- Comercio: 283 empresas, $347.257 MM (23,7%)
- Manufactura: 277 empresas, $282.644 MM (19,3%)
- Minero: 44 empresas, $209.489 MM (14,3%) — **densidad de ingresos por empresa mas alta**
- Construccion: 60 empresas, $33.589 MM (2,3%)
- Agropecuario: 24 empresas, $16.402 MM (1,1%)

### Lectura
La densidad de ingresos por empresa varia drasticamente entre macrosectores. Minero tiene
$4.760 MM promedio por empresa, vs servicios con $1.358 MM. Esto es relevante para los
capitulos 6 (SuperSociedades) y 7 (empresas y empleo).

## Validacion

- `npm run build`: OK, 16 paginas (+1 nueva).
- Smoke test dev server:
  - GET `/temas/empresas/02-clasificacion/` → 200
  - GET CSVs nuevos → 200

## Pendientes

- Datos por departamento del universo completo (no solo top 1000) → necesario para capitulo 4
- Datos de SAS vs otras formas en el RUES completo (mas alla del top 1000) → mejoraria capitulo 2
- Datos de supervivencia detallados por sector → necesario para capitulo 5
- DIAN RUT actualizado → seguimos sin descarga masiva
