# Reporte D — Presupuesto General de la Nación (PGN)

## Pregunta clave del capítulo
Una vez recaudada la plata, ¿en qué se gasta el Estado? ¿Cuánto va a funcionamiento, cuánto a inversión, cuánto al pago de la deuda? ¿Y cuánto del presupuesto realmente se ejecuta?

## Por qué importa
El presupuesto anual es la decisión política más concreta de cada año. El monto del PGN (en 2025 ~$502 billones) es lo que determina qué obras se hacen, cuántos maestros se contratan, cuánto se gasta en defensa. Pero el presupuesto aprobado y el ejecutado nunca coinciden, y la diferencia revela mucho.

## Datos requeridos
1. **PGN total 2010-2026**: monto aprobado en pesos corrientes, constantes y como % del PIB.
2. **Distribución por tipo de gasto**:
   - Funcionamiento (sueldos + gastos generales + transferencias corrientes)
   - Servicio de la deuda (intereses + amortización)
   - Inversión (proyectos del Banco de Programas y Proyectos)
3. **Distribución por sectores**:
   - Educación, salud, defensa, justicia, transporte, agricultura, vivienda, cultura, etc.
   - Defensa típicamente es el sector con mayor planta, educación con mayor presupuesto agregado.
4. **Ejecución real vs apropiación**:
   - % de ejecución anual por sector
   - "Rezago" presupuestal: lo apropiado que no se ejecuta en el año.
5. **Sistema General de Participaciones (SGP)**: transferencias a departamentos y municipios. Educación, salud, propósito general.
6. **Sistema General de Regalías (SGR)**: ingresos de regalías y su distribución.

## Fuentes oficiales
- **MinHacienda — DGPPN (Dirección General de Presupuesto Público Nacional)**
  - Anteproyecto del PGN (junio cada año)
  - Mensaje Presidencial al Congreso (octubre)
  - Ley anual de presupuesto (octubre-diciembre)
  - Decreto de liquidación (diciembre)
  - Ejecución mensual y anual
- **DNP — Plan Plurianual de Inversiones (PPI)**: vinculado al PND 2022-2026.
- **Congreso — Comisiones Económicas (III y IV)**: actas de discusión del PGN.
- **Contraloría — Informe Financiero y Contable de la Nación**: ejecución consolidada.

## Caveats conocidos
1. **PGN no es todo el gasto público**: faltan entidades autónomas (BanRep, universidades públicas, empresas estatales). El "gasto del sector público no financiero" es mayor.
2. **Distinción funcionamiento vs inversión es porosa**: muchos "proyectos de inversión" son en realidad gasto recurrente disfrazado de inversión.
3. **Vigencias futuras**: el Estado se compromete a gastar en años futuros. Esas vigencias no aparecen en el PGN del año en curso pero comprometen presupuesto.
4. **Inflexibilidades**: el ~85% del PGN está "comprometido por ley" (transferencias a salud y educación por SGP, pensiones, intereses de deuda). Solo ~15% es discrecional.
5. **Adiciones**: durante el año el Congreso puede hacer adiciones (típicamente para incluir partidas no previstas en el PGN inicial).

## Verificación cruzada
- PGN aprobado en la Ley anual contra ejecución reportada por MinHacienda al cierre del año.
- Total funcionamiento contra cuentas nacionales DANE (cuentas del gobierno).
- SGP contra transferencias reportadas por las entidades territoriales (puede haber discrepancias por rezagos).

## Gráficos planeados
1. **Composición del PGN 2026**: treemap con sectores ordenados por monto.
2. **PGN como % del PIB 2010-2025**: tendencia de crecimiento del Estado.
3. **Funcionamiento vs inversión vs deuda** (área apilada).
4. **Ejecución real por sector** (barras con dos valores: apropiado y ejecutado).
5. **Las 10 entidades con más presupuesto** (ranking).

## Datasets a descargar
- `pgn_2026_ley.pdf` (Ley aprobada por el Congreso)
- `pgn_historico_2010_2026.xlsx` (consolidar agregados)
- `ejecucion_pgn_2024_anual.pdf` (MinHacienda)
- `sgp_distribucion_2026.pdf` (CONPES anual)

## Notas para el lector
Al final del capítulo, el lector debería poder responder: "Si el Presidente quisiera aumentar el gasto en educación, ¿de dónde sacaría la plata?". La respuesta involucra el ~85% rígido por ley + las pocas palancas discrecionales reales.
