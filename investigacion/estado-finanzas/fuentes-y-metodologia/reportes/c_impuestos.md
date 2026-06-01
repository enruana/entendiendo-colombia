# Reporte C — De dónde sale la plata: impuestos

## Pregunta clave del capítulo
¿De dónde saca el Estado colombiano sus ingresos, qué impuestos pesan más, quién paga qué, y cómo se compara Colombia con otros países en presión fiscal?

## Por qué importa
La discusión de las reformas tributarias (2012, 2014, 2016, 2018, 2022, ...) es recurrente pero suele estar mal informada. La gente confunde "impuestos altos" con "presión fiscal alta", y rara vez distingue entre quién paga formalmente vs quién termina pagando económicamente (incidencia tributaria).

## Datos requeridos
1. **Estructura de recaudo total**:
   - DIAN administra los impuestos nacionales: renta, IVA, GMF (4x1000), aranceles, sobretasa CREE/sobretasas vigentes.
   - Tributos territoriales: ICA (Impuesto de Industria y Comercio, municipal), predial (municipal), vehículos (departamental), estampillas, alumbrado, plusvalía, etc.
   - Contribuciones parafiscales: SENA, ICBF, cajas de compensación, contribuciones de FONDESEP, etc.
   - Regalías: pagos del sector extractivo (no son técnicamente impuestos pero son ingresos fiscales).
2. **Composición histórica 2010-2025 del recaudo DIAN** por tipo de impuesto (renta vs IVA vs aranceles vs GMF).
3. **Quién paga la renta**: distribución por declarantes (personas naturales vs personas jurídicas). Padrón de Grandes Contribuyentes (~5.000 contribuyentes que aportan ~75% del recaudo).
4. **Tarifas vigentes**: tarifa nominal de renta, IVA general y reducido, GMF, aranceles promedio.
5. **Comparación internacional**: recaudo/PIB de Colombia vs OCDE, vs América Latina (CEPAL, Revenue Statistics).

## Fuentes oficiales
- **DIAN Cifras y Estadísticas**: https://www.dian.gov.co/dian/cifras/Paginas/EstadisticasRecaudo.aspx
  - Boletín mensual de recaudo (Excel y PDF)
  - Estadísticas por tipo de tributo, por subdirección
- **MinHacienda — Marco Fiscal de Mediano Plazo (MFMP)**: análisis fiscal anual, junio de cada año.
- **OECD Revenue Statistics**: https://stats.oecd.org (incluye Colombia desde 2018 cuando entró a la OCDE).
- **CEPAL — Panorama Fiscal de América Latina**: comparación regional.
- **Ley de cada reforma tributaria**: Diario Oficial (Leyes 1607/2012, 1739/2014, 1819/2016, 1943/2018, 2010/2019, 2155/2021, 2277/2022).

## Caveats conocidos
1. **Recaudo nominal vs real**: por inflación, el recaudo en pesos corrientes siempre crece. Hay que deflactar o expresar en % del PIB para comparaciones longitudinales.
2. **Devoluciones**: el recaudo bruto incluye lo que después se devuelve por saldos a favor. El recaudo neto es lo que efectivamente queda.
3. **Evasión y elusión**: la DIAN estima la "brecha tributaria" pero las cifras son aproximadas. Estudios académicos dan rangos amplios.
4. **Tributación de regalías**: el régimen de regalías cambió en 2011 (Acto Legislativo 05); las cifras anteriores no son comparables directamente.
5. **Cambios metodológicos**: la OCDE publica series consistentes; el Banco Mundial puede tener clasificaciones distintas. Especificar siempre la fuente.

## Verificación cruzada
- DIAN Boletín mensual vs MFMP anual: deben coincidir las cifras agregadas.
- OECD Revenue Statistics vs MFMP: las cifras OCDE están estandarizadas pero pueden tener desfase de 1-2 años.
- Recaudo % PIB: contrastar denominador (PIB) con el del DANE Cuentas Nacionales.

## Gráficos planeados
1. **Composición del recaudo 2025** (treemap o donut): renta, IVA, GMF, externos, otros.
2. **Evolución 2010-2025 del recaudo total** en pesos constantes y % PIB.
3. **Presión fiscal Colombia vs OCDE**: barras comparativas.
4. **Quién paga renta**: distribución por deciles de declarantes.
5. **Reformas tributarias** (línea de tiempo con efectos estimados).

## Datasets a descargar
- `dian_recaudo_mensual_2010_2025.xlsx` (consolidado, si está disponible o construirlo desde boletines)
- `oecd_revenue_statistics_colombia.csv` (OECD Stats)
- `dian_grandes_contribuyentes.pdf` (anual)
- `mfmp_2025.pdf` (MinHacienda)

## Notas para el lector
El capítulo debería contestarle al lector: "Si en Colombia se recauda menos que en la OCDE, ¿es porque las tarifas son menores o porque la base es más estrecha?". Spoiler: las tarifas son comparables; la base es mucho más estrecha (informalidad, exenciones, evasión).
