# Reporte B — Sueldos en el sector público

## Pregunta clave del capítulo
¿Cuánto gana cada quien en el Estado, cómo se determinan esos sueldos, y cómo se comparan con lo que paga el sector privado y con el salario mínimo?

## Por qué importa
Es uno de los debates más recurrentes en Colombia: "los congresistas ganan demasiado", "los magistrados se aumentan ellos mismos", "los sueldos del Estado no han subido en años". Las cifras existen, son públicas, pero rara vez se ponen en contexto comparable.

## Datos requeridos
1. **Asignación mensual de cada nivel** (en SMMLV y en pesos corrientes 2026):
   - Presidente de la República
   - Ministros
   - Magistrados de Altas Cortes
   - Congresistas (Senado y Cámara)
   - Procurador, Contralor, Fiscal General, Defensor
   - Director DAFP, DNP, etc.
   - Asesor grado 19 (referente alto de la rama ejecutiva)
   - Profesional especializado típico
   - Técnico operativo típico
2. **Salario mínimo legal vigente** y su histórico 2010-2026.
3. **Asignación de regímenes especiales**:
   - Fuerzas Militares y Policía Nacional (regímenes propios)
   - Magistrados de Altas Cortes (autodeterminación con tope)
   - Congresistas (vinculación al sueldo de magistrados)
4. **Comparación con sector privado**:
   - Mediana salarial GEIH (DANE) por nivel educativo
   - Salarios típicos de cargos directivos del sector privado (Adecco, Talenses, Page reports)
5. **Pensión vs salario activo**: cómo se calculan las mesadas de altos funcionarios.

## Fuentes oficiales
- **Decreto anual del Gobierno** sobre asignaciones de altos cargos. Decreto típico de enero/febrero.
  - Para 2026: Decreto 0[XXXX] de 2026, publicado en el Diario Oficial.
- **DAFP — Manual específico de funciones y competencias laborales**: define escalas por grado y nivel.
- **Ministerio de Trabajo — Salario mínimo**: histórico salario mínimo y auxilio de transporte.
- **Función Pública — Sistema de Información SIIF Nación II** (para nómina pública agregada): si está disponible.
- **DANE — GEIH** para comparación con el sector privado.

## Caveats conocidos
1. **Salario base vs ingreso total**: los altos funcionarios reciben además primas (técnica, no remuneración, etc.) que pueden aumentar el ingreso 30-70% sobre el sueldo "publicado". Hay que distinguir asignación básica de ingreso total mensualizado.
2. **Régimen de Fuerza Pública**: militares y policías tienen escalafones propios, con tablas distintas. No se pueden equiparar 1:1.
3. **Universidades públicas**: profesores tienen régimen propio (Decreto 1279 de 2002), con puntos académicos. Profesor titular cat. especial puede ganar más que un ministro.
4. **Distritales y municipales**: cada alcaldía y gobernación define sus propios sueldos hasta un tope. Bogotá DC tiene su propia escala.
5. **Topes constitucionales**: la Corte Constitucional ha dicho que ningún servidor puede ganar más que el Presidente (con excepciones notables en regímenes propios).

## Verificación cruzada
- Decreto de asignación contra Diario Oficial.
- Mediana del sector privado contra microdatos GEIH (corte de un periodo específico).
- Contrastar con declaraciones públicas de patrimonio de altos servidores cuando estén disponibles.

## Gráficos planeados
1. **Pirámide salarial del Estado**: en SMMLV, desde técnico operativo hasta Presidente.
2. **Brecha sueldo público vs privado** por nivel educativo (mediana).
3. **Evolución del sueldo de un congresista en SMMLV** (2010-2026): muestra si crece más o menos que el SMMLV.
4. **Comparación internacional**: sueldo del presidente colombiano vs OCDE (en SMMLV de cada país, para neutralizar el efecto de la divisa).

## Datasets a descargar
- `decreto_asignaciones_2026.pdf` (Diario Oficial)
- `decretos_asignaciones_historicos_2015_2026.zip`
- Tabla manual: cargo -> asignación mensual -> primas -> ingreso total

## Notas para el lector
El objetivo no es decir si los sueldos están bien o mal: es ponerlos en una escala comparable y mostrar la lógica del sistema. El lector debería poder, después de leer el capítulo, responderle a quien diga "el Presidente gana X" si esa cifra es la asignación o el ingreso total, y compararla con la mediana del país.
