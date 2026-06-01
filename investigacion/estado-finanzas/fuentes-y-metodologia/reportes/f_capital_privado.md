# Reporte F — Capital privado en movimiento

## Pregunta clave del capítulo
Más allá del Estado, ¿cómo se mueve la plata privada que entra y sale de Colombia? IED, remesas, salida de capitales, balanza de pagos.

## Por qué importa
La balanza de pagos resume la posición externa del país. Si entran más dólares de los que salen, la economía tiene financiamiento externo y la moneda tiende a apreciarse. Si salen más, hay presión devaluatoria. Las decisiones de inversionistas extranjeros, las remesas de migrantes y la salida de capitales del país son flujos enormes que afectan el peso, las tasas de interés y la inflación.

## Datos requeridos
1. **Balanza de pagos completa**:
   - Cuenta corriente: balanza comercial + servicios + renta + transferencias (remesas)
   - Cuenta de capitales: IED, inversión de portafolio, otros
   - Cambio en reservas internacionales
2. **IED por país de origen**: Estados Unidos, España, Panamá, Suiza, Reino Unido, etc.
3. **IED por sector**: petróleo y minería vs servicios financieros vs manufactura vs transporte vs comercio.
4. **Remesas de migrantes**:
   - Total anual (típicamente USD 10-12 mil millones para 2024)
   - Por país emisor: EEUU, España, Chile, Ecuador, etc.
   - Por departamento receptor: Valle, Antioquia, Cundinamarca, Risaralda, Quindío
5. **Salida de capitales**: inversión colombiana en el exterior (Bancolombia, ISA, Grupo Argos, EPM, etc.).
6. **Reservas internacionales**: nivel, composición (monedas, oro, DEG), meses de importaciones que cubren.

## Fuentes oficiales
- **BanRep — Balanza de pagos**: https://www.banrep.gov.co/es/estadisticas/balanza-pagos
  - Datos trimestrales y anuales.
- **BanRep — Remesas**: serie mensual con corte por país emisor.
- **BanRep — Reservas internacionales**: saldo, composición.
- **ProColombia**: análisis de IED desde la perspectiva promocional.
- **DIAN — Comercio exterior**: importaciones y exportaciones por país y producto.
- **DANE — Comercio exterior**: estadísticas complementarias.

## Caveats conocidos
1. **IED "fantasma"**: una parte importante de la IED en Colombia entra vía Panamá, Países Bajos o Suiza, pero el inversionista último puede ser de otro país. Las cifras "por país de origen" sobreestiman a estas jurisdicciones.
2. **Remesas no reportadas**: una parte de las remesas entra por canales informales (hawala, dinero de bolsillo). Las cifras BanRep solo capturan canales formales (giros, cuentas).
3. **Petróleo distorsiona**: la IED en sector extractivo es muy volátil y depende del precio del crudo. En años de alza, la IED se ve "alta" sin que cambien las condiciones estructurales.
4. **Salida de capitales no siempre es mala**: la inversión colombiana en el exterior (transnacionales colombianas) genera renta repatriada y diversifica riesgos.

## Verificación cruzada
- BanRep Balanza de pagos vs DIAN Comercio exterior: la balanza comercial debe coincidir aproximadamente.
- Remesas BanRep vs Banco Mundial / FMI BoP (suelen coincidir).
- IED por país BanRep vs ProColombia: pueden tener diferencias por clasificación.

## Gráficos planeados
1. **Cuenta corriente Colombia 2010-2025**: línea con saldo (suele ser deficitario).
2. **IED 2010-2025 por sector**: barras apiladas.
3. **Top 10 países origen IED**: ranking.
4. **Remesas mensuales 2020-2025**: línea con tendencia.
5. **Mapa de remesas por departamento receptor**.
6. **Reservas internacionales en meses de importaciones**: línea con regla del FMI (mínimo 3 meses).

## Datasets a descargar
- `banrep_balanza_pagos_2010_2025.xlsx`
- `banrep_remesas_mensual_2010_2025.xlsx`
- `procolombia_ied_sectorial_2024.pdf`
- `dane_dian_comercio_exterior_2025.xlsx`

## Notas para el lector
Al final del capítulo, el lector debería poder responder: "Si entran USD 15 mil millones en remesas y la IED es USD 17 mil millones, ¿por qué el peso se devalúa?". La respuesta involucra los otros componentes de la balanza (déficit comercial, pago de intereses externos, salida de capitales especulativos) que no son tan visibles en los titulares.
