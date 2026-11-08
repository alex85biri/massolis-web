# Auditoría de accesibilidad WCAG 2.2 · Web de MASSolis

**Fecha:** 8 de noviembre de 2026
**Página:** `index.html` (web de una sola página, con dos ventanas emergentes: presupuesto y opinión)
**Objetivo:** WCAG 2.2, niveles A y AA (el nivel que exige la norma europea EN 301 549 y la Ley Europea de Accesibilidad).

## Resultado

**La página cumple WCAG 2.2 AA en todo lo comprobado salvo una excepción aceptada por la marca** (2.2.2, ver «Excepción aceptada»), tras corregir los 9 problemas encontrados (abajo).

| Prueba | Antes | Después |
|---|---|---|
| axe-core 4.10 (reglas WCAG 2.0/2.1/2.2 A y AA) en 5 estados: escritorio, móvil, ventana de presupuesto, ventana de opinión y menú del móvil | 0 errores | 0 errores |
| Lighthouse · Accesibilidad | 100 | 100 |
| Revisión manual asistida (teclado, foco, movimiento, contraste no textual, texto sobre fotos, reflujo, espaciado) | 9 problemas | 0 |

Las herramientas automáticas solo detectan una parte de los problemas: los 9 que había los encontró la revisión manual, no axe ni Lighthouse.

## Cómo se ha revisado

1. **Automático:** axe-core con todas las reglas WCAG A/AA y buenas prácticas, en los cinco estados de la página; Lighthouse en móvil.
2. **Teclado:** recorrido completo con Tab (58 paradas), comprobando que cada elemento muestra el foco y que la cabecera fija no lo tapa.
3. **Movimiento:** inventario de todas las animaciones en marcha y su duración; comprobación con «reducir movimiento» activado.
4. **Contraste no textual:** bordes de campos, casillas, puntos de carrusel y estrellas, medidos contra su fondo.
5. **Texto sobre fotos y degradados:** contraste medido sobre los píxeles reales que hay detrás de cada texto (el 5 % más desfavorable), en escritorio y móvil.
6. **Reflujo a 320 px** y **espaciado de texto ampliado** (interlineado 1,5; letras 0,12 em; palabras 0,16 em; párrafos 2 em).

## Problemas encontrados y corregidos

| # | Criterio | Nivel | Problema | Corrección |
|---|---|---|---|---|
| 1 | 2.2.2 Pausar, detener, ocultar | A | 7 animaciones decorativas sin fin (destellos de la portada y de los pasos, estrella del logo, latido del «Plus MASS», brillo del logo grande). | Se corrigió (terminaban antes de 5 s), pero **después se volvió a dejar sin fin por decisión de marca**: ver «Excepción aceptada». |
| 2 | 2.2.2 Pausar, detener, ocultar | A | El carrusel de opiniones pasa solo cada 7 s sin forma de pararlo. | Botón **Pausar / Reanudar el pase automático** junto a las flechas (además se para con el ratón o el foco encima y no arranca si se pide menos movimiento). |
| 3 | 1.4.11 Contraste no textual | AA | Bordes de campos y desplegables del formulario: 1,35:1. | Nuevo token `--control-border` (#7A86A6): 3,63:1. |
| 4 | 1.4.11 Contraste no textual | AA | Casilla de privacidad: 1,64:1. Bordes de las tarjetas de plan: 1,35:1. | Mismo borde de control: 3,63:1. |
| 5 | 1.4.11 Contraste no textual | AA | Puntos del carrusel sin marcar: 1,46:1. | Color de control: más de 3:1. |
| 6 | 2.4.7 Foco visible | AA | El anillo de foco de los campos era casi transparente (15 %). | Anillo de 3 px al 55 %, bien visible. |
| 7 | 1.4.3 Contraste (mínimo) | AA | Etiquetas sobre las fotos de los pasos y de los planes («Te escuchamos», «Periódico»…): 1,9–2,3:1 sobre zonas claras de la foto. | Fondo de la etiqueta más opaco: 10,3:1 incluso con foto blanca detrás. |
| 8 | 1.4.3 Contraste (mínimo) | AA | Antetítulo «Nuestro símbolo» sobre la foto: 3,7:1. En móvil, antetítulo de la portada sobre la foto: 2,3:1. | Tono más claro (5,2:1) y degradado de la portada más temprano en móvil (8,4:1). |
| 9 | 4.1.2 Nombre, función, valor · 3.3.1 Identificación de errores | A | Puntos de carrusel con función de «pestaña» sin paneles; etiquetas ARIA en elementos sin función (carrusel, estrellas); errores del formulario solo en texto. | Puntos como botones con `aria-current`; carrusel con `role="region"`; estrellas con `role="img"`; campos con error marcados con `aria-invalid`, asociados al mensaje y con el foco llevado al primero. |

Además: el desplazamiento suave se desactiva con «reducir movimiento», y `scroll-padding-top` evita que la cabecera fija tape lo enfocado (2.4.11).

## Excepción aceptada

**2.2.2 Pausar, detener, ocultar (nivel A) · Brillos de la marca.** Los destellos con la estrella del logo (cabecera y pie, portada, fotos de los pasos, «Plus MASS» y el logo grande) laten sin fin porque son un elemento indispensable de la identidad de MASSolis (decisión de la marca, 8 nov 2026). Estrictamente, WCAG pide que el movimiento automático de más de 5 s se pueda pausar.

Medidas que reducen el impacto:
- **Se detienen por completo** si la persona tiene activado «reducir movimiento» en su sistema (comprobado: 0 animaciones en marcha).
- Son **pequeños, decorativos y no tapan ni mueven contenido**; no parpadean más de 3 veces por segundo (2.3.1 se cumple).
- El carrusel de opiniones, que sí es contenido, mantiene su botón **Pausar / Reanudar**.

Si en algún momento hiciera falta cumplir 2.2.2 de forma estricta (por ejemplo, para un contrato público), basta con añadir un botón «Pausar animaciones» o volver a limitarlas a 5 s.

## Lo que ya cumplía

- **Estructura:** un `<h1>`, jerarquía de títulos ordenada, `<header>`, `<nav>`, `<main>`, `<footer>`; enlace «Saltar al contenido» (2.4.1).
- **Imágenes:** todas con texto alternativo; iconos decorativos ocultos a lectores de pantalla (1.1.1).
- **Teclado:** todo es usable con teclado; foco visible en las 58 paradas; los carruseles tienen flechas y puntos además del deslizamiento (2.1.1, 2.4.7).
- **Ventanas emergentes:** `<dialog>` nativo con título asociado; el foco entra en la ventana, se cierra con Escape y vuelve al botón que la abrió (2.1.2, 2.4.3).
- **Formularios:** cada campo con su etiqueta, grupos con `<fieldset>`/`<legend>`, `autocomplete` en nombre, teléfono, correo y código postal (1.3.1, 1.3.5, 3.3.2); mensajes de estado anunciados (4.1.3).
- **Tamaño de los objetivos táctiles:** mínimo 24 × 24 px (2.5.8).
- **Reflujo:** a 320 px no hay desplazamiento horizontal (1.4.10). **Espaciado de texto:** nada se corta (1.4.12).
- **Idioma:** `lang="es"` (3.1.1). **Título de página** descriptivo (2.4.2).
- **Movimiento reducido:** con la preferencia del sistema activada no queda ninguna animación en marcha.

## Límites de esta auditoría y recomendaciones

- **No se ha probado con lectores de pantalla reales** (NVDA, VoiceOver, TalkBack) ni con personas usuarias. Es la siguiente comprobación recomendada antes de publicar.
- **Fotos provisionales de Unsplash:** cuando se pongan las fotos reales de MASSolis, revisar sus textos alternativos y el contraste de los textos que van encima.
- **Política de privacidad:** el formulario recoge datos personales; hace falta una página de política de privacidad enlazada desde la casilla (requisito legal del RGPD, no de WCAG).
- **Declaración de accesibilidad:** si MASSolis entra en el ámbito de la Ley Europea de Accesibilidad, publicar una declaración con este resultado y una vía de contacto.
- **Mantener el resultado:** cualquier cambio de colores debe hacerse en las variables del sistema de diseño (`:root`), que ya garantizan los contrastes; volver a pasar axe y Lighthouse tras cambios grandes.
