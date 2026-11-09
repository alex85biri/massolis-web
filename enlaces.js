// Enlaces dentro de la misma página sin «#» en la dirección (pedido de la usuaria, 9 nov 2026).
// Un enlace como href="#planes" baja hasta su sección igual que siempre, pero la dirección se queda
// en massolis.com, sin «#planes». Si alguien llega con un «#» (un enlace compartido), se baja a esa
// sección y se limpia la dirección. Se carga con defer en todas las páginas, después de su propio script,
// para que los enlaces que ya hacen otra cosa (abrir el presupuesto) se respeten.
(function () {
  var limpiaDireccion = function () {
    if (location.hash) history.replaceState(history.state, '', location.pathname + location.search);
  };

  // Lleva el foco a la sección, para que el teclado y los lectores de pantalla sigan desde ahí
  var enfoca = function (el) {
    if (!el.matches('a[href], button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
    el.focus({ preventScroll: true });
  };

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = decodeURIComponent(a.getAttribute('href').slice(1));
    var destino = id ? document.getElementById(id) : null;
    if (id && !destino) return;           // destino desconocido: que el navegador haga lo de siempre
    e.preventDefault();
    if (!destino || destino.id === 'inicio') {
      window.scrollTo({ top: 0 });        // «volver al inicio»: arriba del todo
      if (destino) enfoca(destino);
    } else {
      destino.scrollIntoView();           // suave o no según la preferencia de movimiento (CSS)
      enfoca(destino);
    }
    limpiaDireccion();
  });

  // Llegada con «#» en la dirección: bajar a esa sección y quitar el «#»
  window.addEventListener('load', function () {
    if (!location.hash) return;
    var el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (el) el.scrollIntoView({ behavior: 'instant' });
    limpiaDireccion();
  });
})();
