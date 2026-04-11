# C.2 - Empleo Formal segun PILA (la otra fuente)

## Pregunta central
Que es PILA, como mide el empleo formal de manera distinta a la GEIH, y por que sus cifras a veces no coinciden con las del DANE?

---

## Glosario de este reporte

| Termino | Que significa |
|---------|--------------|
| **PILA** | Planilla Integrada de Liquidacion de Aportes. Es el sistema electronico por donde los empleadores pagan mensualmente los aportes de seguridad social de sus trabajadores. |
| **Aporte parafiscal** | Contribucion obligatoria que las empresas pagan ademas del salario, para financiar el sistema de seguridad social y otros servicios (SENA, ICBF, Cajas de Compensacion). |
| **Cotizante** | Persona por la cual se esta pagando un aporte al sistema de seguridad social en un mes determinado. No es exactamente lo mismo que "trabajador formal", pero se parece mucho. |
| **UGPP** | Unidad de Gestion Pensional y Parafiscales. Entidad del Ministerio de Hacienda que vigila que las empresas paguen bien los aportes. Es la que publica las estadisticas de PILA. |
| **IBC** | Ingreso Base de Cotizacion. El salario sobre el que se calculan los aportes. Normalmente es igual al salario del trabajador, pero puede ser menor (si hay subdeclaracion) o mayor. |
| **Operador de Informacion** | Empresas privadas autorizadas por el Ministerio de Salud para procesar las planillas PILA. Ejemplos: Aportes en Linea, SOI, Mi Planilla, Enlace Operativo. |
| **Registro administrativo** | Dato que se genera de una transaccion real, no de una encuesta. Si alguien paga un aporte, queda registrado. Es "dato duro" vs los autorreportes de la GEIH. |
| **Mes vencido** | Significa que el aporte de enero se paga en febrero. Hay un mes de rezago automatico. |

---

## 1. QUE ES PILA Y COMO NACIO

Antes de 2005, un empleador en Colombia tenia que diligenciar y pagar **multiples formularios cada mes**: uno para la EPS, uno para el fondo de pension, uno para la ARL, uno para el SENA, uno para el ICBF, uno para la caja de compensacion. Cada entidad tenia su propio formato, sus propias fechas, sus propios canales de pago. Era caotico.

PILA (Planilla Integrada de Liquidacion de Aportes) se creo para **unificar** todo eso en una sola planilla electronica. Ahora el empleador diligencia un unico formulario y hace un solo pago, que se distribuye automaticamente entre todas las entidades.

### Marco legal
- **Resolucion 1303 de 2005** del Ministerio de Proteccion Social: crea PILA
- **Decreto 1465 de 2005**: define como opera el sistema y crea la figura del "Operador de Informacion"
- **Decreto 1931 de 2006**: regula la modalidad asistida para quienes no tienen acceso a internet
- **Decreto 1273 de 2018**: establece el pago en modalidad "mes vencido"
- **Decreto 1990 de 2016**: define fechas de pago escalonadas segun los ultimos dos digitos del NIT del empleador

### Quien administra PILA
Tres entidades se reparten el trabajo:

1. **Ministerio de Salud y Proteccion Social**: es el "dueno" de la base de datos. Emite la normativa tecnica y mantiene el sistema. Los certificados de aportes se solicitan aqui.

2. **UGPP (Unidad de Gestion Pensional y Parafiscales)**: entidad del Ministerio de Hacienda. Recibe automaticamente los datos de PILA, los cruza con la DIAN, vigila que las empresas paguen correctamente, sanciona a quienes no lo hacen. **Es la que publica las estadisticas mensuales de cotizantes**.

3. **Ministerio de Trabajo**: usa los datos de PILA para verificar el cumplimiento de programas como "Empleos para la Vida".

---

## 2. COMO FUNCIONA EL PAGO

### Paso a paso
1. Cada mes, el empleador ingresa a un **Operador de Informacion** autorizado (Aportes en Linea, SOI, Mi Planilla, Enlace Operativo, Simple, Asopagos o Soy)
2. Registra la nomina: cada trabajador con su salario (IBC)
3. Tambien registra **novedades**: ingresos, retiros, suspensiones, vacaciones, incapacidades, licencias
4. El sistema calcula automaticamente los aportes para cada subsistema
5. El empleador paga electronicamente (PSE, transferencia)
6. El dinero se distribuye a las entidades correspondientes
7. Los datos quedan en la base de PILA, que la UGPP usa para estadisticas

### Periodicidad
- **Mensual**, pago mes vencido (el aporte de enero se paga en febrero)
- Las fechas de pago son **escalonadas** segun los ultimos dos digitos del NIT del empleador
- Hay un rezago de ~5-8 semanas entre el hecho laboral real y su aparicion en las estadisticas publicas

### Los 7 operadores autorizados
1. **Aportes en Linea** (el mas grande, mas de 3 millones de usuarios)
2. **SOI**
3. **Mi Planilla**
4. **Enlace Operativo** (SUAPORTE)
5. **Simple**
6. **Asopagos**
7. **Soy** (del Fondo Nacional del Ahorro)

---

## 3. QUE SUBSISTEMAS COBRA PILA

La PILA cubre 6 subsistemas del sistema de proteccion social colombiano.

| Subsistema | Tasa | Quien paga |
|-----------|:----:|------------|
| **Salud (EPS)** | 12.5% del salario | Empleador 8.5% + Trabajador 4% |
| **Pension (AFP o Colpensiones)** | 16% del salario | Empleador 12% + Trabajador 4% |
| **Riesgos laborales (ARL)** | 0.522% a 6.96% | 100% empleador (segun nivel de riesgo) |
| **Cajas de Compensacion Familiar** | 4% | 100% empleador |
| **SENA** (formacion) | 2% | 100% empleador |
| **ICBF** (bienestar familiar) | 3% | 100% empleador |

### Para que sirve cada uno
- **EPS**: atencion en salud
- **AFP/Colpensiones**: ahorro para pension de vejez, invalidez, sobrevivencia
- **ARL**: cobertura por accidentes laborales y enfermedades profesionales
- **Cajas de Compensacion**: subsidio familiar, vivienda, recreacion, creditos
- **SENA**: formacion tecnica gratuita
- **ICBF**: programas de ninez y bienestar familiar

### Exoneraciones importantes
Desde la Ley 1607 de 2012, las empresas con trabajadores que ganan **hasta 10 salarios minimos** estan exoneradas del aporte a SENA, ICBF y del componente empleador de salud. Esto aplica solo a personas juridicas.

---

## 4. LAS CIFRAS: Cuantos cotizantes hay en PILA

### Serie reciente (datos UGPP)

| Periodo | Total cotizantes | Observaciones |
|---------|:---------------:|--------------|
| Abril 2019 | ~12.040.000 | Pre-pandemia |
| Abril 2020 | **10.280.000** | Peor mes de pandemia (-1 millon) |
| Junio 2021 | ~12.000.000+ | Recuperacion |
| Noviembre 2022 | **13.834.317** | Pico historico |
| Febrero 2023 | 12.881.007 | |
| Noviembre 2023 | 13.604.765 | Desaceleracion (-1.66%) |
| Febrero 2024 | 12.844.462 | |
| **Septiembre 2024** | **13.819.745** | **Pico maximo 2024** |
| Febrero 2025 | 12.972.258 | |
| Abril 2025 | 13.271.487 | |
| **Mayo 2025** | **13.143.806** | Caida anual de -3.4% |
| Diciembre 2025 | 13.352.360 | Estabilizacion |
| Marzo 2026 | ~11.300.000 (solo privados) | Segun calculos de la ANDI |

### Detalle de mayo 2025 (ultimo informe mensual publicado por UGPP)
- **Total cotizantes**: 13.143.806
- **Dependientes** (empleados): 10.917.900
- **Independientes**: 2.225.900
- **Variacion anual**: -3.4% (perdida de cotizantes)
- **Edad promedio**: 39.7 anos
- **Mujeres**: 46.3% del total
- **Entradas al sistema en el mes**: 1.062.741
- **Salidas del sistema en el mes**: 1.041.763
- **Suspensiones temporales**: 316.321

### El gran hallazgo
Los trabajadores formales privados pasaron de **~11.8 millones en 2023** a **~11.3 millones en marzo 2026**. Una caida de ~500.000 personas. Esto es lo que denuncio la ANDI en marzo 2026 (ver reporte C.3).

---

## 5. DONDE ACCEDER A LOS DATOS

### 1. Tablero de Control UGPP (lo mas facil)
**URL**: https://www.ugpp.gov.co/Evolucion-cotizaciones-Sistema-Proteccion-Social

Es una herramienta interactiva con mas de 107 millones de registros. Permite filtrar por sector economico, departamento, edad, genero, subsistema. No permite descargar datos crudos, pero muestra graficas y tablas agregadas.

### 2. Informes mensuales UGPP (datos publicados mes a mes)
**URL patron**: `https://www.ugpp.gov.co/wp-content/uploads/[año]/[mes]/[MesAA].html`
**Ejemplo**: https://www.ugpp.gov.co/wp-content/uploads/2025/07/Mayo25.html

Cada informe trae: total cotizantes, dependientes vs independientes, variaciones, entradas/salidas, distribucion por IBC, edad, genero, departamento.

### 3. Boletines historicos UGPP (archivo)
- [Boletin noviembre 2020](https://www.ugpp.gov.co/sites/default/files/Nuestra-entidad/05-Cotizantes_noviembre_2020.pdf)
- [Boletin junio 2021](https://www.ugpp.gov.co/sites/default/files/Nuestra-entidad/Cotizaciones_Sistema_Proteccion_Social_Junio_2021_0.pdf)
- [Informe noviembre 2023](https://www.ugpp.gov.co/sites/default/files/Parafiscales/Presentacion_NOV_2023.html)

### 4. Pagina oficial PILA del Ministerio de Salud
**URL**: https://www.minsalud.gov.co/proteccionsocial/Paginas/pila.aspx
Marco normativo, anexos tecnicos, contacto de soporte.

### 5. datos.gov.co (portal de datos abiertos)
Se puede buscar "PILA" o "cotizantes seguridad social". Los datasets disponibles son limitados.

---

## 6. VENTAJAS DE PILA COMO FUENTE

### 1. Es un registro real, no una encuesta
Cada cotizante en PILA existe porque alguien pago dinero real por el. No es "lo que la persona dice", es "lo que paso efectivamente".

### 2. Cubre el 100% del universo formal
No es una muestra. Captura TODOS los cotizantes, no una fraccion representativa.

### 3. Detalle granular
Permite saber el IBC exacto, el sector economico, el municipio, la edad, el genero, el tipo de vinculacion de cada cotizante.

### 4. Alta frecuencia
Datos mensuales, disponibles con pocos dias de rezago.

### 5. Permite rastrear dinamica laboral
Se puede saber cuantas personas entraron al empleo formal en un mes (1.062.741 en mayo 2025) y cuantas salieron (1.041.763).

### 6. Se puede cruzar con DIAN
La UGPP cruza automaticamente PILA con los datos tributarios de la DIAN. Esto permite detectar subdeclaracion de ingresos o evasion de aportes.

---

## 7. LIMITACIONES DE PILA

### 1. Posible doble conteo (puestos, no personas)
Si una persona trabaja simultaneamente para dos empleadores, genera **dos registros** en PILA (uno por cada empleador). Si se cuentan registros en vez de personas unicas, se infla la cifra. La UGPP depura esto identificando cedulas unicas, pero al usar los datos hay que verificar que unidad de analisis se esta usando.

### 2. No captura informales
Por definicion, quien no cotiza (55% de los ocupados) no aparece en PILA. PILA mide exclusivamente la formalidad, no el mercado laboral total.

### 3. Rezago
El pago es mes vencido y escalonado. Entre que alguien entra a trabajar y que aparece en las estadisticas, pueden pasar 5-8 semanas.

### 4. Sector publico incompleto
Algunos servidores publicos tienen regimenes especiales que no siempre aparecen en PILA. Esto hace que la cifra de empleo publico sea mas baja en PILA que en la GEIH.

### 5. Excluye morosos
Si un empleador no paga a tiempo, sus trabajadores no aparecen ese mes, aunque sigan empleados. Esto puede hacer que las cifras fluctuen por razones administrativas, no por cambios reales en el empleo.

### 6. No mide calidad del empleo
PILA solo dice "cotizo" o "no cotizo". No dice nada sobre la estabilidad del contrato, las condiciones de trabajo, o si el salario reportado es el real.

### 7. Estacionalidad fuerte
Los cotizantes suben en agosto-septiembre-octubre (mas contratos activos) y bajan en enero-febrero (fin de contratos temporales, renovaciones). Si uno compara picos con valles, puede exagerar las caidas. La ANDI fue criticada por esto.

---

## 8. PILA vs GEIH: En que se diferencian

| Dimension | PILA | GEIH |
|-----------|------|------|
| **Tipo de fuente** | Registro administrativo | Encuesta a hogares |
| **Quien responde** | Empleadores (obligacion legal) | Personas encuestadas |
| **Unidad** | Cotizaciones pagadas | Ocupados autorreportados |
| **Universo** | Solo formales | Todo el mercado laboral |
| **Cobertura** | 100% del formal obligado | Muestra representativa nacional |
| **Estandar** | Normativa colombiana | OIT (internacional) |
| **Operador** | UGPP / Minsalud | DANE |
| **Sector publico** | Solo cotizantes efectivos | Todos son formales por definicion |
| **Rezago** | 5-8 semanas | 4-6 semanas |
| **Puede tener doble conteo?** | Si, puestos no personas | No |
| **Captura informales?** | No | Si |

**La diferencia esencial**: PILA y GEIH miden dos cosas distintas. PILA mide cuantos contratos formales existen (cotizaciones). La GEIH mide cuantas personas consideran tener un empleo formal (autorreporte). Pueden dar numeros muy distintos y ambos ser correctos.

---

## 9. CASO DE USO: "Empleos para la Vida"

El programa "Empleos para la Vida" del Ministerio de Trabajo es el mejor ejemplo del uso practico de PILA.

### Como funciona
El Gobierno paga un subsidio a los empleadores que **creen nuevos empleos formales y los mantengan** por al menos 6 meses. Para verificar que el empleo es real, se cruza la nomina PILA del empleador con una nomina base (mayo 2023). Si aparecen trabajadores nuevos en la nomina actual, el empleador recibe el subsidio.

### Incentivos por tipo de trabajador (como % del salario minimo)
- **35%** por cada persona con discapacidad
- **30%** por cada joven 18-28 anos (+10% si llevaba mas de 4 meses desempleado)
- **20%** por cada mujer mayor de 28 anos
- **15%** por cada hombre mayor de 28 anos

### Resultados
- **2023**: 811.686 nuevos empleos verificados
- **2024 (ciclos 1-10)**: 323.524 nuevos empleos, 14.457 empresas beneficiadas
- **Acumulado hasta ciclo 10**: 714.510 empleos formales verificados por PILA
  - 409.859 jovenes
  - 169.713 mujeres
  - 1.522 personas con discapacidad

PILA es el arbitro oficial de si se creo o no un empleo formal. Sin PILA, no habria forma de verificar el programa.

### Marco legal del programa
- **Decreto 1736 de 2023**: crea el programa
- **Decreto 0533 de 2024**: reglamenta y permite repostulaciones
- Administrado por la **UGPP** a traves de la plataforma PAEF

---

## 10. DATO CLAVE PARA LA INVESTIGACION

PILA es la fuente **mas confiable para medir empleo formal en terminos de cotizacion real**, pero NO es la fuente oficial de estadisticas laborales. Esa sigue siendo la GEIH.

Cuando las dos fuentes dan numeros distintos, no necesariamente una esta mal. Estan midiendo fenomenos diferentes:
- **PILA** mide **transacciones** (pagos efectivos de aportes)
- **GEIH** mide **percepciones** (lo que la persona declara sobre su situacion laboral)

En un pais con mucha rotacion, informalidad y modalidades atipicas como Colombia, las dos mediciones pueden diverger significativamente. La controversia DANE vs ANDI del 2026 es un ejemplo perfecto de esto, y la veremos a fondo en el reporte C.3.

---

## FUENTES UTILIZADAS

- [UGPP - Pagina oficial](https://www.ugpp.gov.co/)
- [UGPP - Informe mensual cotizantes mayo 2025](https://www.ugpp.gov.co/wp-content/uploads/2025/07/Mayo25.html)
- [UGPP - Tablero de control](https://www.ugpp.gov.co/Evolucion-cotizaciones-Sistema-Proteccion-Social)
- [UGPP - Noticia lanzamiento tablero](https://ugpp.gov.co/noticia-tablero-control)
- [Minsalud - Pagina oficial PILA](https://www.minsalud.gov.co/proteccionsocial/Paginas/pila.aspx)
- [Minsalud - Operadores PILA autorizados](https://www.minsalud.gov.co/proteccionsocial/paginas/contacto-operadores-pila.aspx)
- [Mintrabajo - Reglamentacion Empleos para la Vida](https://www.mintrabajo.gov.co/comunicados/2024/mayo/se-reglamenta-el-programa-empleos-para-la-vida-.-incentivos-para-la-creacion-y-permanencia-de-nuevos-empleos-formales)
- [UGPP/PAEF - Empleos para la Vida](https://paef.ugpp.gov.co/empleos-para-la-vida/)
- [Decreto 1465 de 2005 (Funcion Publica)](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=16499)
- [Banco de la Republica - Reporte Emisor 205 (GEIH vs PILA)](https://www.banrep.gov.co/es/emisor-205)
- [El Tiempo - Pandemia y PILA](https://www.eltiempo.com/economia/sectores/por-la-pandemia-mas-de-un-millon-de-trabajadores-dejo-de-cotizar-a-seguridad-social-segun-la-pila-531598)
