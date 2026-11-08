# SPEC · Promo MASSolisapp · «Un día en tu casa»

GOAL:    quien lo ve siente «siempre sé qué pasa en mi casa» y quiere el portal de MASSolisapp.
OUTPUT:  HyperFrames, 1920 x 1080, 30 fps.
TIME:    26 s x 30 = 780 frames. Música (pendiente de sesión en HeyGen): ~100 BPM, un compás = 2,4 s.

LOOK:
- Mundo: el salón limpio (foto real de la portada de la web, `assets/fotos/salon.jpg`) a sangre completa.
  Izquierda: velo hielo #F4F7FC al 96 % → 0 % en x = 1150 px, para leer el texto sobre la foto.
  Luz del día: velo de tono sobre la foto, mañana #BFD3FF al 16 %, mediodía 0 %, 13:00 #FFD2A0 al 14 %.
- Tinta: azul marino #0E1F4D (hora y frases), gris azulado #4A5578 (frase secundaria).
  Un acento: azul #3B6FD8, solo en la palabra clave de cada frase.
- Tipos: Inter 900 230 px tracking -4 % (la hora); Inter 700 64 px tracking -2 % (frase);
  Inter 400 34 px (frase secundaria); cierre Inter 900 104 px + Instrument Serif cursiva 56 px (como la web).
- Medio: UI real del portal (capturas 2x del prototipo), dentro de un móvil de 430 x 888 px
  (bisel 16 px #0B1430, radio 64, sombra 0 40 80 / 35 %). Piezas ampliadas: radio 28, sombra 0 30 60 #0E1F4D / 30 %.
- Sin grano ni viñeta.

OBJECTS:
- La hora: dígitos grandes que ruedan hacia arriba al cambiar (el reloj que avanza).
- El móvil con el portal real; la pieza que importa sale del móvil ampliada 1,7x.
- Las 5 estrellas: se rellenan una a una (las de la captura «valorado»).
- El logo: el infinito de MASSolis dibujándose con su estrella.

MOTION:
- Entrar: power3.out 0,5 s. Mover: power2.inOut 0,6 s. Salir: power2.in 0,35 s.
- La hora: rueda 0,5 s (sale -100 %, entra desde +100 %), frase 0,15 s después.
- Pieza ampliada: sale del sitio que ocupa en el móvil (escala 0,5 = tamaño real) a 0,85 (1,7x) en 0,6 s; vuelve igual.
- Navegación dentro del móvil: empuje lateral 0,45 s.

SHOTS:
1. 0–6 s (f 0–180) 09:58 · «María llega a tu casa.» / «Y tú lo ves al momento.» Frame 0 ya muestra hora, frase y móvil (inicio).
   0,8 s: la tarjeta «María está en tu espacio desde las 09:58» sale del móvil ampliada. 5,3 s vuelve.
2. 6–11,5 s (f 180–345) la hora rueda a 11:30 · «Ya lleva 8 de 10 tareas.» El móvil empuja a Seguimiento.
   6,9 s: sale ampliado el bloque «Llegada · Limpieza en curso · 8 de 10 tareas». 10,9 s vuelve.
3. 11,5–16,5 s (f 345–495) 13:00 · «Te llegan las fotos.» La luz se calienta.
   12,2 s: salen ampliadas las fotos del servicio. 15,9 s vuelven.
4. 16,5–21,5 s (f 495–645) 13:05 · «Y lo valoras en 10 segundos.» El móvil empuja a Valorar.
   17,2 s: sale ampliada la fila «¿Cómo ha ido?» con las estrellas; 17,9–18,9 s se rellenan una a una; 19,2 s el móvil pasa a «valorado».
5. 21,5–26 s (f 645–780) Cierre: el velo hielo cubre todo de izquierda a derecha (0,6 s); el infinito se dibuja con la estrella (1,6 s),
   «MASSolisapp» + «Tu espacio, *siempre cuidado*.» + botón «Pide tu acceso». Se mantiene 2 s.

BANNED: fondo azul marino oscuro vacío; brillos, partículas, degradados morados; todo centrado y todo apareciendo a la vez;
        texto que se mueve mientras se lee; UI inventada (solo capturas reales); el logo en una esquina.

QA: f 0 (gancho completo), 1,6 s (tarjeta ampliada), 6,4 s (rueda de la hora), 8 s, 13 s, 18,5 s (estrellas a medias), 20 s, 23 s (logo dibujándose), 25,5 s (cierre).
