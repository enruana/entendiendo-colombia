# Reporte A — Estructura del Estado colombiano

## Pregunta clave del capítulo
¿Cómo está organizado el Estado en Colombia, cuántas personas trabajan en él y qué hacen?

## Por qué importa
Antes de hablar de cuánto cuesta el Estado, hay que entender cuántas "cajas" tiene y para qué sirve cada una. Mucha gente cree que "el Estado" es solo la Presidencia y los ministerios. En realidad son tres ramas, decenas de entidades autónomas, organismos de control, 32 departamentos y 1.100+ municipios.

## Datos requeridos
1. **Mapa de las tres ramas**: ejecutivo (Presidencia + 19 ministerios + DAS-equivalentes), legislativo (Congreso bicameral), judicial (4 altas cortes + jurisdicciones ordinarias).
2. **Organismos autónomos**: BanRep, Contraloría, Defensoría, Procuraduría, Fiscalía, JEP, CNE, Registraduría.
3. **Niveles territoriales**: 32 departamentos + Bogotá DC + 1.103 municipios + 5 distritos especiales (Cartagena, Barranquilla, Santa Marta, Buenaventura, Riohacha).
4. **Cantidad de servidores públicos**:
   - Por rama y nivel
   - Por modalidad: planta (carrera + libre nombramiento + provisional), contrato de prestación de servicios, supernumerarios
   - Total nacional vs total territorial
5. **Concentración geográfica**: ¿qué porcentaje de servidores nacionales trabajan en Bogotá vs regiones?

## Fuentes oficiales
- **DAFP — Empleo público**: https://www.funcionpublica.gov.co/empleo-publico
  - Publica el "Informe del estado del empleo público" anualmente. Cifras agregadas por rama, sector y nivel territorial.
- **MinHacienda — PGN**: para inferir tamaños relativos por sector (cuánto se gasta en personal en cada sector).
- **Constitución Política, arts. 113-117**: estructura de las tres ramas + organismos autónomos.

## Caveats conocidos
1. **El concepto "servidor público" no es único**. Hay servidores con vínculo legal (planta), con contrato de trabajo (entidades del Estado de naturaleza privada), y prestadores de servicios (contratos de prestación). Las cifras varían según qué se incluya.
2. **Provisionales vs carrera**: una proporción alta de la planta del Estado opera con "provisionales" (sin concurso), lo que dificulta análisis longitudinales.
3. **Subnacional dispersa**: las cifras territoriales (alcaldías y gobernaciones) suelen estar desactualizadas porque cada entidad reporta por su cuenta.
4. **Empresas industriales y comerciales del Estado (Ecopetrol, ISA, Telecom, etc.)**: tienen regímenes mixtos. Sus trabajadores no siempre se cuentan como "servidores públicos".

## Verificación cruzada
- Comparar conteo DAFP con conteo BanRep de "empleados gobierno general" del SNA (cuentas nacionales) → debe coincidir aproximadamente.
- Verificar contra GEIH del DANE: pregunta sobre "trabajador del gobierno" da una cifra desde la encuesta a hogares.

## Gráficos planeados
1. **Diagrama de las tres ramas + organismos** con número de servidores por rama.
2. **Distribución geográfica** de servidores nacionales (Bogotá vs regiones).
3. **Evolución del tamaño del Estado** 2010-2025 (servidores totales del orden nacional).
4. **Tipo de vinculación** (planta carrera, provisional, libre nombramiento, contrato).

## Datasets a descargar
- `dafp_empleo_publico_anual_<YYYY>.pdf` — informe anual del DAFP
- Si se publica en abierto, también el archivo Excel anexo con conteos por entidad.

## Notas para el lector
Este capítulo es la base del tema. Si alguien dice "hay que reducir el tamaño del Estado" o "el Estado no tiene capacidad", la respuesta empieza aquí: hay que saber qué Estado y de qué tamaño antes de discutir reformas.
