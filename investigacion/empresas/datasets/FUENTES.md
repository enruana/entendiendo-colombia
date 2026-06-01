# Empresas en Colombia — Inventario y Fuentes

Este documento lista las fuentes oficiales a usar en la investigacion del tema `empresas`, su URL verificada, periodicidad, formato, y como citarlas.

Fecha de inicio de la investigacion: **1 de junio de 2026**

---

## Estructura

```
investigacion/empresas/
├── datasets/
│   ├── FUENTES.md                  <-- este archivo
│   ├── raw/                        <-- descargas originales (PDF, Excel, CSV, HTML)
│   │   ├── confecamaras/           <-- Informe Dinamica Empresarial trimestral
│   │   ├── dian/                   <-- Estadisticas de RUT y declarantes
│   │   ├── dane_cne/               <-- Censo Nacional Economico 2021 + EAM/EAC/EAS
│   │   ├── supersociedades/        <-- SIREM / SIRFIN / Portal de Informacion Empresarial
│   │   ├── banrep/                 <-- (reservado para credito empresarial)
│   │   └── mincit/                 <-- Estudios MinCIT sobre tejido productivo
│   └── processed/                  <-- CSVs limpios para los charts
└── fuentes-y-metodologia/
    ├── reportes/                   <-- markdown por capitulo (a..g)
    └── notas/                      <-- notas sueltas y bitacora de descubrimientos
```

---

## FUENTES OFICIALES (verificadas con HTTP 200 al 2026-06-01)

### 1. Confecamaras — Registro Unico Empresarial y Social (RUES)

- **URL portal de analisis**: https://www.confecamaras.org.co/analisis-economico
- **URL RUES consulta publica**: https://www.rues.org.co
- **Producto principal**: Informe de Dinamica Empresarial — boletin trimestral
- **Contenido**: empresas creadas, canceladas, renovadas, por tamano, sector, region
- **Frecuencia**: Trimestral (publicacion ~6-8 semanas despues del cierre del trimestre)
- **Formato**: PDF + Excel anexo
- **Cobertura**: Universo completo del Registro Mercantil (todas las camaras de comercio del pais)
- **Como citar**: Confecamaras (anio). Informe de Dinamica Empresarial — [Trimestre]. Bogota.

**Notas:**
- RUES es el registro consolidado de las 57 camaras de comercio de Colombia
- Confecamaras agrega y publica analisis nacionales
- Limitacion: solo cubre empresas formalmente registradas; deja por fuera la informalidad empresarial

---

### 2. DIAN — Estadisticas del RUT (Registro Unico Tributario)

- **URL portal cifras**: https://www.dian.gov.co/dian/cifras
- **Producto principal**: Estadisticas del RUT (inscripciones, activos, por departamento, por tipo)
- **Frecuencia**: Anual (con cortes mensuales en algunos casos)
- **Formato**: Excel y PDF (boletines)
- **Cobertura**: Universo de inscritos en el RUT (incluye personas naturales y juridicas con obligaciones tributarias)
- **Como citar**: DIAN (anio). Estadisticas del Registro Unico Tributario.

**Notas:**
- RUT incluye personas naturales obligadas a declarar; el subconjunto de empresas hay que filtrarlo por tipo de cotizante
- Las cifras NO son directamente comparables con RUES porque el universo es distinto

---

### 3. DANE — Censo Nacional Economico 2021 (CNE)

- **URL portal**: https://www.dane.gov.co/index.php/estadisticas-por-tema/comercio-interno/censo-economico-de-colombia
- **URL historico**: https://www.dane.gov.co/index.php/categoria-economicas/5691-censo-economico-de-colombia-historico
- **Microdatos**: https://microdatos.dane.gov.co/
- **Producto principal**: Censo de unidades economicas (establecimientos) — primer censo economico desde 1990
- **Frecuencia**: Decenal (el ultimo fue 2021, antes del 1990)
- **Formato**: Anexos Excel + microdatos + tableros web
- **Cobertura**: Establecimientos visibles (con ubicacion fija o ambulantes detectables) en todo el territorio nacional
- **Como citar**: DANE (2021). Censo Nacional Economico 2021.

**Notas:**
- Cuenta ESTABLECIMIENTOS, no empresas (una empresa puede tener varios)
- Incluye tanto establecimientos formales como informales (sin RUES)
- Es la unica fuente que captura el tejido informal economico

---

### 4. DANE — Encuestas anuales sectoriales (EAM / EAC / EAS)

- **EAM (Manufactura)**: https://www.dane.gov.co/index.php/estadisticas-por-tema/industria/encuesta-anual-manufacturera-enam
- **EAC (Comercio)**: https://www.dane.gov.co/index.php/estadisticas-por-tema/comercio-interno/encuesta-anual-de-comercio-eac
- **EAS (Servicios)**: https://www.dane.gov.co/index.php/estadisticas-por-tema/servicios/encuesta-anual-de-servicios-eas
- **Producto principal**: Estadisticas de produccion, ventas, empleo, valor agregado por sector
- **Frecuencia**: Anual (publicacion ~12-15 meses despues del cierre del ano de referencia)
- **Formato**: Anexos Excel + boletin tecnico PDF
- **Cobertura**: Universo de empresas de cierto tamano que cumplen el umbral muestral (no es censo)
- **Como citar**: DANE (anio). Encuesta Anual [Manufacturera/Comercio/Servicios].

**Notas:**
- Son la unica fuente con desagregacion sectorial detallada y series largas
- Excluyen empresas pequenas: la EAM cubre ~7.000 establecimientos manufactureros de >=10 empleados
- Excelentes para preguntas de productividad y valor agregado

---

### 5. Superintendencia de Sociedades — SIREM / SIRFIN / Portal de Informacion Empresarial

- **URL portal**: https://www.supersociedades.gov.co/web/asuntos-economicos-societarios/sirfin
- **URL informes economicos**: https://www.supersociedades.gov.co/web/asuntos-economicos-societarios/informes-economicos-y-financieros
- **URL SIIS (Sistema Integrado de Informacion Societaria)**: https://siis.ia.supersociedades.gov.co/
- **Producto principal**: Estados financieros de empresas vigiladas (~30 mil al ano)
- **Frecuencia**: Anual (corte 31 de diciembre, publicacion a mediados del ano siguiente)
- **Formato**: Excel grande (10+ MB), CSV, consulta interactiva
- **Cobertura**: Sociedades comerciales que cumplen umbrales de activos/ingresos definidos por la SuperSociedades
- **Como citar**: SuperSociedades (anio). Sistema de Informacion y Reporte Empresarial — SIREM.

**Notas:**
- Es la mejor fuente para mirar la elite productiva: empresas con balance, P&L, indicadores financieros
- SIREM tiene datos historicos 2012-2015 publicos; despues SIRFIN/SIIS
- Limitacion: no es el universo, solo las vigiladas (que igual concentran la mayor parte del PIB privado)

---

### 6. MinCIT — Estudios Economicos

- **URL portal**: https://www.mincit.gov.co/estudios-economicos
- **Producto principal**: Boletines sectoriales y de comercio exterior
- **Frecuencia**: Variable (mensual, trimestral)
- **Uso previsto**: Contexto narrativo, no datos crudos

---

## CONTEO DE FUENTES POR PREGUNTA DE INVESTIGACION

Cada fuente responde a preguntas distintas. Resumen para no confundir cifras:

| Pregunta | Fuente correcta | Fuente equivocada |
|---|---|---|
| Cuantas empresas formalmente registradas hay? | **Confecamaras / RUES** | DIAN (incluye personas naturales) |
| Cuantas declaran impuestos? | **DIAN / RUT** | Confecamaras (no todas las del RUES son contribuyentes) |
| Cuantos establecimientos economicos hay (incluyendo informales)? | **DANE / CNE 2021** | RUES (excluye informales) |
| Cuantas tienen estados financieros auditados? | **SuperSociedades / SIREM** | RUES (la mayoria no reporta financieros) |
| Cuantas crean / cierran al ano? | **Confecamaras Dinamica Empresarial** | DIAN (cambios de RUT no equivalen a vida empresarial) |
| Distribucion geografica? | **RUES** (registro completo geocodificado) | Encuestas DANE (muestra, no censo) |
| Produccion / valor agregado por sector? | **DANE EAM/EAC/EAS** | RUES (no captura magnitud economica) |

---

## DECRETOS / NORMAS CLAVE

- **Decreto 957 de 2019**: define los rangos de ingresos por sector para clasificar como micro / pequena / mediana / gran empresa. Reemplaza el criterio anterior basado en activos y empleados (Ley 590 de 2000 y Ley 905 de 2004).
  - Manufactura, comercio y servicios tienen umbrales distintos
  - La clasificacion es por ingresos por actividades ordinarias en el ano fiscal previo

---

## SIGUIENTES PASOS

1. Descargar el ultimo Informe de Dinamica Empresarial de Confecamaras (trimestre disponible mas reciente, probablemente Q1 2026)
2. Descargar anexos del CNE 2021 desde el portal DANE
3. Bajar dataset SIREM ultimo ano disponible desde SuperSociedades
4. Bajar Boletin de cifras RUT mas reciente desde DIAN
5. Procesar a CSVs uniformes en `processed/`
