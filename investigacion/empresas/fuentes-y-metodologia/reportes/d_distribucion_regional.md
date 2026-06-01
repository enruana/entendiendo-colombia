# Capitulo 4 — Donde estan las empresas

## Pregunta central

Como esta distribuido geograficamente el tejido empresarial colombiano, y que tan concentrado esta?

## Hipotesis y cifras de partida

- **Bogota + Antioquia + Valle del Cauca** concentran aproximadamente el **50%** de las empresas registradas
- **Bogota sola** suele tener entre el **25-30%** del RUES nacional
- Los departamentos de la periferia (Choco, Vichada, Vaupes, Guainia) tienen menos del **0.5%** cada uno
- La concentracion es aun mayor en empresas grandes: ~70% de las grandes estan en Bogota+Antioquia+Valle
- La concentracion en empresas exportadoras y SuperSociedades es todavia mayor

## Datos necesarios

| Dato | Fuente |
|---|---|
| Empresas RUES por departamento, ano mas reciente | Confecamaras |
| Empresas por ciudad principal (top 30) | Confecamaras |
| Densidad empresarial (empresas / 1000 habitantes) | calculo propio (RUES / proyecciones DANE) |
| Establecimientos CNE 2021 por departamento | DANE CNE |
| Empresas vigiladas SuperSociedades por departamento | SuperSociedades |
| Concentracion sectorial por region | DANE EAM/EAC/EAS o CNE |

## Graficas previstas

1. **Mapa coropletico de Colombia**: empresas por departamento (con escala log porque la concentracion es extrema)
2. **Mapa de densidad**: empresas por cada 1000 habitantes (cambia el ranking)
3. **Treemap**: top 10 ciudades por numero de empresas
4. **Barras apiladas**: distribucion por tamano en top 5 departamentos vs resto
5. **Doble columna**: % empresas vs % poblacion por departamento (mostrar la sobre- y sub-representacion)

## Riesgos / Atencion

- La sede registrada (camara de comercio) no siempre coincide con la operacion economica real
- Bogota tiene una camara unica gigante (CCB), pero su zona de influencia incluye municipios de Cundinamarca y Boyaca
- Para mapas se necesita un GeoJSON de departamentos colombianos — verificar el del DANE o del IGAC

## Lectura clave para el lector

Si el empleo formal se mide donde estan los empleadores, y los empleadores estan brutalmente concentrados, eso explica por que la oferta de empleo formal en los departamentos de la periferia es estructuralmente baja — no es solo "menos poblacion", es **menos empresas por persona**.
