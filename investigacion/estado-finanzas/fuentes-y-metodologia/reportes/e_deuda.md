# Reporte E — Deuda pública

## Pregunta clave del capítulo
¿Cuánto le debe el Estado colombiano? ¿A quién? ¿En qué moneda? ¿Cuánto cuesta cada año pagar esa deuda y por qué importa para el resto del presupuesto?

## Por qué importa
La deuda pública es el segundo gasto más grande del PGN (después de funcionamiento). En 2025, el servicio de la deuda (intereses + amortizaciones) representó cerca del 25% del presupuesto. Si la deuda crece más rápido que la economía, se vuelve insostenible. La discusión sobre "regla fiscal" y "ancla fiscal" gira alrededor de esta sostenibilidad.

## Datos requeridos
1. **Saldo total de la deuda pública**:
   - Deuda interna (en pesos, mayoritariamente TES) vs deuda externa (en USD, EUR y otras)
   - Como % del PIB
   - Por tenedor: inversionistas privados internos, BanRep, multilaterales (BID, BM, FMI), gobiernos extranjeros, otros
2. **Perfil de vencimientos**: cuándo vencen los TES y los bonos externos. Concentración por años.
3. **Costo de la deuda**:
   - Servicio anual (intereses + amortización) en pesos y % PIB
   - Tasa promedio ponderada
   - Plazo promedio
4. **Calificación crediticia**: BBB-, BB+ (S&P, Moody's, Fitch). Histórico de cambios.
5. **Comparación internacional**: deuda/PIB Colombia vs OCDE, vs América Latina (FMI).
6. **Regla fiscal**: techo anual a la deuda, % PIB objetivo.

## Fuentes oficiales
- **MinHacienda — DGCPTN**: portal de crédito público con saldo, perfil, tenedores.
- **BanRep — Estadísticas**: deuda externa total (pública + privada), distribución por sector.
- **MFMP (junio cada año)**: proyección de deuda y senda fiscal.
- **CONFIS — Comité Confis**: actas y proyecciones de regla fiscal.
- **FMI — WEO database** y **FMI Article IV**: comparación internacional.
- **S&P, Moody's, Fitch**: comunicados de calificación (públicos).

## Caveats conocidos
1. **Deuda bruta vs neta**: la neta descuenta activos financieros del Estado. En Colombia la deuda neta es ~5-7 pp del PIB menor que la bruta.
2. **Pasivos contingentes**: pensiones (FOMAG, CAJA NAL, etc.), garantías y otros pasivos no aparecen en la "deuda pública directa" pero comprometen recursos futuros.
3. **Deuda en USD vs pesos**: el riesgo cambiario. Una devaluación del 10% encarece automáticamente la deuda en USD medida en pesos.
4. **Vigencias futuras vs deuda**: las VF son compromisos del Estado pero no son deuda en sentido estricto.
5. **Cambio de metodología 2022**: la regla fiscal cambió de objetivo en 2022 (Ley 2155 de 2021). Series antes y después no son directamente comparables.

## Verificación cruzada
- MinHacienda DGCPTN vs BanRep (deuda externa pública debería coincidir aproximadamente).
- FMI WEO vs MFMP (cifras de deuda/PIB con dos fuentes).
- Servicio anual reportado en PGN ejecutado vs informes DGCPTN.

## Gráficos planeados
1. **Saldo deuda pública 2010-2025**: línea con interna + externa apiladas, en % del PIB.
2. **Perfil de vencimientos**: barras por año (próximos 30 años).
3. **Quién es dueño de la deuda colombiana**: torta por tipo de tenedor.
4. **Servicio de la deuda como % del PGN**: cuánto del presupuesto se va a pagar deuda.
5. **Calificación crediticia 2010-2025**: línea de tiempo con downgrades/upgrades.
6. **Comparación regional**: deuda/PIB Colombia vs Chile, Brasil, México, Perú.

## Datasets a descargar
- `dgcptn_deuda_publica_2026.xlsx` (saldo y composición)
- `mfmp_2025_proyeccion_deuda.pdf`
- `imf_weo_oct2025.xlsx` (comparación internacional)

## Notas para el lector
Al final del capítulo, el lector debería poder responder: "¿Por qué importa que la deuda/PIB suba?". La respuesta no es moral ("hay que ser austeros") sino mecánica: cada peso de servicio de la deuda es un peso que no se gasta en otra cosa, y si la deuda crece más que la economía, ese peso ocupa cada vez más espacio.
