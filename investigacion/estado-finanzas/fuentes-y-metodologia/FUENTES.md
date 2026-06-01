# Fuentes oficiales — Tema "Estado y finanzas públicas"

Inventario de fuentes verificadas para cada capítulo. Última verificación: 2026-06-01.

---

## Estructura del Estado y servidores públicos

### Departamento Administrativo de la Función Pública (DAFP)
- **URL base**: https://www.funcionpublica.gov.co — HTTP 200 ✓
- **Empleo público**: https://www.funcionpublica.gov.co/empleo-publico — HTTP 200 ✓
- **Qué publica**: cifras de empleo público (plantas globales, provisionales, contratos), evaluaciones de desempeño, escalas salariales del Estado, normatividad sobre el régimen del servidor público.
- **Acceso a datos**: la mayoría es PDF; algunos tableros agregados.

### SIGEP (Sistema de Información y Gestión del Empleo Público)
- **URL probada**: https://www.sigep.gov.co — **HTTP 000 (no resuelve por DNS desde herramientas automáticas)**
- **Alternativa**: el acceso público suele ir vía DAFP. Para consultas individuales (un servidor) requiere registro.
- **Qué contiene**: hojas de vida públicas de servidores, planes anticorrupción, plantas de personal. Para análisis agregados, mejor usar los boletines del DAFP.

### MinHacienda — Política fiscal
- **URL base**: https://www.minhacienda.gov.co — HTTP 200 ✓
- **Política fiscal y estadísticas**: https://www.minhacienda.gov.co/webcenter/portal/EntOfPublico/pages_PoliticaFiscalyEstadisticasFiscales — HTTP 403 a curl pero válida en navegador.
- **Qué publica**: Marco Fiscal de Mediano Plazo (MFMP), boletines fiscales, ejecución del PGN, deuda pública (DGCPTN).

---

## Impuestos y recaudación

### DIAN — Cifras y estadísticas
- **URL principal**: https://www.dian.gov.co/dian/cifras/Paginas/EstadisticasRecaudo.aspx — HTTP 200 ✓
- **Qué publica**: recaudo mensual y anual por tipo de impuesto (renta, IVA, GMF, externos, etc.), comportamiento por subdirecciones, padrón de grandes contribuyentes.
- **Formato**: Excel y PDF mensual. La serie histórica disponible va al menos desde 2000.

### OCDE — Revenue Statistics
- **stats.oecd.org**: https://stats.oecd.org — HTTP 200 ✓
- **data-explorer**: https://data-explorer.oecd.org — HTTP 200 ✓
- **URL temática**: https://www.oecd.org/tax/revenue-statistics.htm — HTTP 403 a curl pero válida en navegador.
- **Qué publica**: comparación internacional de recaudo/PIB por país y tipo de impuesto. Permite comparar Colombia con OCDE y América Latina.

---

## Presupuesto General de la Nación (PGN)

### MinHacienda — Presupuesto
- Página base ya cubierta arriba. La sección de presupuesto contiene el PGN aprobado, las modificaciones y la ejecución.
- **Documentos clave**:
  - Anteproyecto del Presupuesto General de la Nación
  - Mensaje Presidencial al Congreso (Ley anual)
  - Marco Fiscal de Mediano Plazo (MFMP, junio cada año)
  - Plan Financiero (anual)

### DNP (Departamento Nacional de Planeación)
- **URL**: https://www.dnp.gov.co — HTTP 200 ✓
- **Qué publica**: Plan Plurianual de Inversiones (PPI), seguimiento al Plan Nacional de Desarrollo (PND), proyectos de inversión registrados en el Banco de Programas.

### Congreso (control político del presupuesto)
- **Cámara**: https://www.camara.gov.co — HTTP 200 ✓
- **Senado**: https://www.senado.gov.co — HTTP 200 ✓
- **Comisiones Económicas (III y IV)** aprueban anualmente el PGN.

---

## Deuda pública

### Banco de la República — Estadísticas
- **URL base**: https://www.banrep.gov.co/es/estadisticas — HTTP 200 ✓
- **Balanza de pagos**: https://www.banrep.gov.co/es/estadisticas/balanza-pagos — HTTP 200 ✓
- **Series estadísticas**: https://www.banrep.gov.co/es/series-estadisticas/agregados-monetarios — HTTP 200 ✓
- **Qué publica**: deuda externa total (pública y privada), saldo, plazos, monedas, costos.

### DGCPTN (Dirección General de Crédito Público y Tesoro Nacional)
- Parte de MinHacienda. Publica el detalle de la deuda pública interna y externa, tenedores de TES, perfil de vencimientos.

---

## Capital privado y flujos externos

### Banco de la República — Balanza de pagos
- IED por país, sector, año (entradas y salidas).
- Remesas familiares (recepción mensual y por país emisor).
- Reservas internacionales.

### ProColombia
- **URL**: https://www.procolombia.co — HTTP 200 ✓
- **Qué publica**: análisis de la IED desde la perspectiva promocional, proyectos por sector y región.

### DIAN — Comercio exterior y declaraciones
- Estadísticas de importaciones y exportaciones (DIAN/DANE).
- Declaraciones de renta (agregadas, padrón de grandes contribuyentes).

---

## Cuentas nacionales y comparación macro

### DANE — Cuentas Nacionales
- **URL**: https://www.dane.gov.co/index.php/estadisticas-por-tema/cuentas-nacionales — HTTP 200 ✓
- **Qué publica**: PIB por rama, gastos finales, ahorro/inversión, formación bruta de capital.

---

## Eficiencia, transparencia y control

### Contraloría General de la República
- **URL**: https://www.contraloria.gov.co — HTTP 200 ✓
- **Qué publica**: hallazgos de auditoría, informes financieros consolidados de la Nación, evaluación de la gestión presupuestal.

### Transparencia por Colombia
- **URL**: https://transparenciacolombia.org.co — HTTP 200 ✓
- **Qué publica**: Índice de Transparencia de Entidades Públicas (ITEP), barómetros regionales.

### Transparencia Internacional — Índice de Percepción de Corrupción (CPI)
- Datos comparables por país, anuales.

---

## Datos abiertos transversales

### Portal Datos Abiertos Colombia
- **URL**: https://www.datos.gov.co — HTTP 200 ✓
- **Qué publica**: catálogo único con datasets de todas las entidades del Estado en CKAN. Útil para descargar series no publicadas por las entidades directamente.

---

## Estado de verificación

| Categoría | Fuentes activas | Cubre |
|-----------|---|---|
| Estructura del Estado | DAFP, MinHacienda | Capítulo 1, 2 |
| Sueldos públicos | DAFP, Decreto anual de salarios | Capítulo 2 |
| Impuestos | DIAN, OCDE, MinHacienda | Capítulo 3 |
| Presupuesto | MinHacienda, DNP, Congreso | Capítulo 4 |
| Deuda | BanRep, DGCPTN | Capítulo 5 |
| Capital privado | BanRep, ProColombia, DIAN | Capítulo 6 |
| Eficiencia y comparación | Contraloría, OCDE, Transparencia | Capítulo 7 |

Todas las URLs marcadas con HTTP 200 fueron probadas vía `curl -sIL`. Las marcadas con 403 son válidas pero bloquean herramientas automatizadas (se confirman manualmente en navegador). Las marcadas con 000 son inaccesibles desde este entorno; se documentan vías alternativas.
