# MASSolis · web corporativa

Web de MASSolis, empresa de limpieza y desinfección de hogares en Sevilla.

**En línea:** [massolis.com](https://massolis.com), publicada con GitHub Pages y dominio propio.
**Arquitectura y documentación del proyecto:** [alex85biri/massolis](https://github.com/alex85biri/massolis)

## Historia

Rediseño iniciado en junio de 2026 a partir de una versión anterior de la web. Publicada el 8 de noviembre de 2026.

## Tecnología

- **HTML, CSS y JavaScript sin framework** ni paso de compilación: lo que hay en el repositorio es lo que se publica.
- **Sistema de diseño propio** en `estilos.css`, organizado en capas de cascada (`@layer`: tokens, base, átomos, moléculas, organismos, secciones, páginas, utilidades y adaptación a pantallas) y con tokens de color, tipografía, espaciado y radios.
- **Tipografías servidas desde la propia web** (`fonts/`), sin Google Fonts ni otros servicios externos de letras.
- **Sin cookies ni analítica.**
- **Formulario de presupuesto sin servidor propio:** se envía a un script de Google Apps Script (`_servicio-presupuesto/Codigo.gs`) que lo valida, limita los envíos y lo manda por correo a la empresa.

## Posicionamiento

- Páginas por servicio: [limpieza de casas](https://massolis.com/limpieza-de-casas-sevilla.html), [Limpieza General](https://massolis.com/limpieza-general-sevilla.html) y [desinfección con ozono](https://massolis.com/desinfeccion-ozono-sevilla.html).
- Datos estructurados schema.org (`LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage`).
- `sitemap.xml`, `robots.txt` y `llms.txt` (resumen para buscadores con IA).
- Alta y seguimiento en Google Search Console.

## Accesibilidad

Auditoría WCAG 2.2 AA con revisión automática (axe-core, Lighthouse) y manual (teclado, foco, movimiento, contraste sobre fotos, reflujo a 320 px). Informe: [docs/auditoria-wcag-2026-11-08.md](docs/auditoria-wcag-2026-11-08.md).

## Estructura

| Archivo | Qué es |
| --- | --- |
| `index.html` | Portada |
| `limpieza-de-casas-sevilla.html`, `limpieza-general-sevilla.html`, `desinfeccion-ozono-sevilla.html` | Páginas de servicio |
| `aviso-legal.html`, `privacidad.html`, `cookies.html` | Información legal |
| `estilos.css` | Sistema de diseño y estilos de todas las páginas |
| `comun.js` | Cabecera, menús y ventana de presupuesto, compartidos por la portada y las páginas de servicio |
| `enlaces.js` | Enlaces internos sin «#» en la dirección |
| `_servicio-presupuesto/Codigo.gs` | Script de Google Apps Script que recibe el formulario |
