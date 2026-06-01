# Capitulo 5 — Nacen, mueren, sobreviven

## Pregunta central

Cuantas empresas se crean cada ano en Colombia, cuantas cierran, y que tan probable es que una empresa nueva siga viva a los 5 anos?

## Hipotesis y cifras de partida

- Se constituyen entre **250.000 y 350.000 empresas** por ano en RUES (depende del ciclo economico)
- La mayoria son **personas naturales** y **SAS**
- Tasa de supervivencia a 5 anos: aproximadamente **30%** (segun estudios Confecamaras)
- La mortalidad es mayor en los primeros 2 anos
- Las micro tienen tasas de supervivencia mucho menores que las pequenas y medianas

## Distinciones importantes

- **Constitucion**: registro inicial de una nueva empresa en camara de comercio
- **Renovacion**: pago anual de renovacion del registro mercantil (obligatorio cada ano antes del 31 de marzo)
- **Cancelacion**: baja voluntaria del registro (formal)
- **No renovacion**: la empresa deja de pagar renovacion (mortalidad de facto)
- **Liquidacion**: proceso formal de cierre (mas raro)

La tasa de mortalidad real suele estimarse combinando cancelaciones + no renovacion.

## Datos necesarios

| Dato | Fuente |
|---|---|
| Constituciones anuales 2010-2026 | Confecamaras Dinamica Empresarial |
| Cancelaciones anuales 2010-2026 | Confecamaras |
| Renovaciones por ano de constitucion (panel) | Confecamaras (estudios de supervivencia) |
| Tabla de supervivencia por sector y tamano | Confecamaras (estudios especiales) |
| Datos trimestrales mas recientes 2025-2026 | Confecamaras |

## Graficas previstas

1. **Linea doble**: constituciones vs cancelaciones por ano, 2010-2026 (mostrar la pandemia)
2. **Area apilada**: balance neto (creadas - canceladas) por trimestre, 2018-2026
3. **Curva de supervivencia** (Kaplan-Meier estilo): % vivas por ano desde constitucion
4. **Barras**: supervivencia a 5 anos por sector y por tamano
5. **Sankey** (opcional): flujo constituidas en 2019 -> estado en 2024 (vivas / canceladas / sin renovar)

## Riesgos / Atencion

- La no-renovacion incluye empresas que cambiaron de figura, no solo cerradas
- Confecamaras publica el dato consolidado, no las microdatas para reproducir la tabla de supervivencia desde cero
- El pico de 2020 (pandemia) puede tener dinamicas mixtas: mas constituciones (emprendimientos de necesidad) y mas cierres simultaneamente

## Lectura clave para el lector

El emprendimiento colombiano tiene mucha entrada y mucha salida. La narrativa "es un pais emprendedor" es cierta en flujo pero falsa en stock: cada ano crece poco el numero neto porque muere casi lo mismo que nace.
