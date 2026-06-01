# Capitulo 1 — Cuantas empresas hay?

## Pregunta central

Cuantas empresas hay en Colombia, y por que la cifra cambia segun la fuente?

## Hipotesis

Las tres principales fuentes oficiales (RUES, DIAN, CNE) dan numeros que difieren en mas de 1 millon de unidades porque cuentan cosas distintas:

- **RUES** cuenta sociedades + personas naturales con registro mercantil vigente (~1,7 millones)
- **DIAN** cuenta inscritos en el RUT con actividad economica (~3+ millones, incluye independientes obligados a declarar)
- **CNE 2021** conto establecimientos visibles, incluyendo informales sin registro (~1,7 millones de unidades economicas activas en 2021)

La cifra que se cita en titulares cambia la narrativa del debate sobre tejido productivo, tributacion y formalizacion.

## Datos necesarios

| Dato | Fuente | Archivo en raw/ |
|---|---|---|
| Empresas activas RUES, serie 2018-2026 | Confecamaras (informes anuales y trimestrales) | confecamaras/ |
| Inscritos RUT por tipo de cotizante 2018-2025 | DIAN | dian/ |
| Establecimientos activos CNE 2021 | DANE | dane_cne/ |
| Comparacion conceptual de los tres universos | sintesis propia | — |

## Graficas previstas

1. Tres barras: RUES vs RUT vs CNE — para el mismo ano (2021, ultimo donde existe CNE)
2. Linea temporal: empresas registradas en RUES, 2018-2026 (con marca de pandemia)
3. Tabla comparativa: que captura cada fuente

## Riesgos / Atencion

- El CNE solo tiene un corte (2021) hasta que se publique el proximo
- El RUT incluye personas naturales que no son "empresas" en sentido estricto — habra que aclarar el subset
- La cifra "1,7 millones" se repite mucho pero corresponde a registros vigentes — hay que distinguir vigente vs activo economicamente

## Lectura clave para el lector

La pregunta "cuantas empresas hay" no tiene una respuesta unica. La respuesta correcta es **"depende"** — y entender de que depende es el punto del capitulo.
