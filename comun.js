// Piezas comunes de la portada y de las páginas de servicio (17 nov 2026):
// cabecera fija, menú del móvil, menú «Servicios», botones de frecuencia y ventana de presupuesto.
// Se carga con defer ANTES de enlaces.js, para que los botones que abren el presupuesto se respeten.
(() => {
  // Servicio que envía las solicitudes de presupuesto a adm@massolis.com: Google Apps Script en la cuenta adm@massolis.com
  // (código en _servicio-presupuesto/Codigo.gs). La portada usa la misma dirección para las opiniones (script de index.html).
  const ENVIO_PRESUPUESTOS = 'https://script.google.com/macros/s/AKfycbwiZe72M6XBN9bN_XOy8Alh6etMBYKDu5Sxz1XNWWkeIf62L0nBWdMdjhQ2XWaYp-hsJg/exec';

  const bar = document.querySelector('.top-bar');
  const onScroll = () => bar.classList.toggle('scrolled', scrollY > 8);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // Menú del móvil ("top" no se puede usar como nombre: choca con window.top)
  const cabecera = document.querySelector('.top');
  const menuBtn = document.querySelector('.menu-btn');
  menuBtn.addEventListener('click', () => {
    const open = cabecera.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    cabecera.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));

  // Menú «Servicios»: se abre con un clic (o Intro) y se cierra al pulsar fuera, con Escape o al salir con el tabulador
  document.querySelectorAll('.nav-grupo').forEach(grupo => {
    const boton = grupo.querySelector('.nav-btn');
    const pon = abierto => { grupo.classList.toggle('abierto', abierto); boton.setAttribute('aria-expanded', abierto); };
    boton.addEventListener('click', () => pon(boton.getAttribute('aria-expanded') !== 'true'));
    document.addEventListener('click', e => { if (!grupo.contains(e.target)) pon(false); });
    grupo.addEventListener('keydown', e => { if (e.key === 'Escape' && boton.getAttribute('aria-expanded') === 'true') { pon(false); boton.focus(); } });
    grupo.addEventListener('focusout', e => { if (e.relatedTarget && !grupo.contains(e.relatedTarget)) pon(false); });
  });

  // Frecuencia del mantenimiento (solo informativo)
  document.querySelectorAll('.freq').forEach(grupo => {
    const nota = grupo.nextElementSibling;
    grupo.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      grupo.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
      nota.textContent = b.dataset.nota;
    });
  });

  // Ventana de presupuesto: la misma en todas las páginas, así que su HTML vive aquí
  if (!document.getElementById('presu-dialogo')) document.body.insertAdjacentHTML('beforeend', `
<dialog class="presu-dialogo" id="presu-dialogo" aria-labelledby="presu-dlg-t">
  <div class="dlg-cabecera">
    <div>
      <p class="kicker">Presupuesto gratis</p>
      <h2 id="presu-dlg-t">Pide tu <em>presupuesto</em></h2>
    </div>
    <button type="button" class="btn-icon dlg-cerrar" data-cerrar-presu aria-label="Cerrar">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>
    </button>
  </div>
  <form class="presu-form" id="presu-form" method="dialog" novalidate>
    <!-- Campo trampa contra robots: las personas no lo ven ni lo rellenan -->
    <div class="sr-only" aria-hidden="true"><label>No rellenar <input type="text" name="web" tabindex="-1" autocomplete="off"></label></div>
    <fieldset class="grupo">
      <legend>¿Qué necesitas?</legend>
      <div class="opciones">
          <label class="opcion"><input type="radio" name="plan" value="01M"><span class="op-cod">M</span><span class="op-txt"><b>Mantenimiento</b><small>2–3 h</small></span></label>
          <label class="opcion"><input type="radio" name="plan" value="02MA"><span class="op-cod">MA</span><span class="op-txt"><b>Mantenimiento Amplio</b><small>3–4 h</small></span></label>
          <label class="opcion"><input type="radio" name="plan" value="03MAS"><span class="op-cod">MAS</span><span class="op-txt"><b>Amplio Solución</b><small>4–5 h</small></span></label>
          <label class="opcion"><input type="radio" name="plan" value="04MASS"><span class="op-cod">MASS</span><span class="op-txt"><b>Amplio Solución Sostenible</b><small>5–6 h</small></span></label>
          <label class="opcion"><input type="radio" name="plan" value="LG"><span class="op-cod">LG</span><span class="op-txt"><b>Limpieza General</b><small>Primera vez o casa nueva</small></span></label>
          <label class="opcion"><input type="radio" name="plan" value="DES"><span class="op-cod">✚</span><span class="op-txt"><b>Desinfección</b><small>Fricción u ozono</small></span></label>
          <label class="opcion"><input type="radio" name="plan" value="NS" checked><span class="op-cod">?</span><span class="op-txt"><b>Aún no lo sé</b><small>Asesoradme</small></span></label>
      </div>
    </fieldset>

    <fieldset class="grupo">
      <legend>Tipo de vivienda</legend>
      <div class="pills">
          <label class="pill"><input type="radio" name="vivienda" value="Piso" checked><span>Piso</span></label>
          <label class="pill"><input type="radio" name="vivienda" value="Casa o chalet"><span>Casa o chalet</span></label>
          <label class="pill"><input type="radio" name="vivienda" value="Ático o dúplex"><span>Ático o dúplex</span></label>
          <label class="pill"><input type="radio" name="vivienda" value="Estudio"><span>Estudio</span></label>
          <label class="pill"><input type="radio" name="vivienda" value="Otra"><span>Otra</span></label>
          <label class="pill"><input type="radio" name="vivienda" value="Aún no lo sé"><span>Aún no lo sé</span></label>
      </div>
    </fieldset>

    <div class="fila2">
      <div>
        <label class="etq" for="pr-metros">Metros aproximados</label>
        <select class="field" id="pr-metros" name="metros">
          <option>Menos de 60 m²</option><option selected>60–90 m²</option><option>90–120 m²</option>
          <option>120–180 m²</option><option>Más de 180 m²</option><option>No lo sé</option>
        </select>
      </div>
      <div>
        <label class="etq" for="pr-frecuencia">Frecuencia</label>
        <select class="field" id="pr-frecuencia" name="frecuencia">
          <option>Una sola vez</option><option>Semanal</option><option selected>Quincenal</option>
          <option>Mensual</option><option>Aún no lo sé</option>
        </select>
      </div>
    </div>

    <fieldset class="grupo">
      <legend>Extras <span class="opc">(opcional)</span></legend>
      <div class="pills">
          <label class="pill"><input type="checkbox" name="extras" value="Plancha"><span>Plancha</span></label>
          <label class="pill"><input type="checkbox" name="extras" value="Patio o balcón"><span>Patio o balcón</span></label>
          <label class="pill"><input type="checkbox" name="extras" value="Plantas exteriores"><span>Plantas exteriores</span></label>
          <label class="pill"><input type="checkbox" name="extras" value="Desinfección con ozono"><span>Desinfección con ozono</span></label>
      </div>
    </fieldset>

    <div class="fila2">
      <div>
        <label class="etq" for="pr-nombre">Nombre *</label>
        <input class="field" id="pr-nombre" name="nombre" type="text" autocomplete="name" required aria-required="true" maxlength="60">
      </div>
      <div>
        <label class="etq" for="pr-cp">Código postal o localidad</label>
        <input class="field" id="pr-cp" name="localidad" type="text" autocomplete="postal-code" maxlength="60">
      </div>
      <div>
        <label class="etq" for="pr-tel">Teléfono</label>
        <input class="field" id="pr-tel" name="telefono" type="tel" aria-describedby="ayuda-contacto" autocomplete="tel" inputmode="tel" maxlength="20">
      </div>
      <div>
        <label class="etq" for="pr-email">Correo</label>
        <input class="field" id="pr-email" name="email" type="email" aria-describedby="ayuda-contacto" autocomplete="email" maxlength="80">
      </div>
    </div>
    <p class="ayuda" id="ayuda-contacto">Déjanos al menos un teléfono o un correo para responderte.</p>

    <div>
      <label class="etq" for="pr-msg">¿Algo más que debamos saber? <span class="opc">(opcional)</span></label>
      <textarea class="field" id="pr-msg" name="mensaje" maxlength="800" placeholder="Mascotas, horario preferido, zonas que más te preocupan…"></textarea>
    </div>

    <label class="check privacidad"><input type="checkbox" name="privacidad" required> <span>He leído la <a href="privacidad.html" target="_blank" rel="noopener">política de privacidad</a> y acepto que MASSolis use estos datos solo para responder a mi solicitud de presupuesto.</span></label>

    <div class="presu-enviar">
      <button class="btn btn-lg" type="submit">Pedir presupuesto <span class="arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M8 7h9v9"/></svg></span></button>
      <p class="presu-msg" id="presu-msg" role="status" aria-live="polite"></p>
    </div>
  </form>
</dialog>
`);
  // ---------- Presupuesto ----------
  const presu = document.getElementById('presu-form');
  if (presu) {
    // Ventana emergente: se abre con cualquier botón de presupuesto (y deja marcado el plan si viene de uno)
    const dlg = document.getElementById('presu-dialogo');
    const abrir = plan => {
      if (plan) { const r = presu.querySelector('input[name="plan"][value="' + plan + '"]'); if (r) r.checked = true; }
      document.getElementById('presu-msg').textContent = '';
      document.documentElement.classList.add('dlg-abierto');
      dlg.showModal();
      dlg.scrollTop = 0;
    };
    const cerrar = () => dlg.close();
    dlg.addEventListener('close', () => document.documentElement.classList.remove('dlg-abierto'));
    dlg.addEventListener('click', e => { if (e.target === dlg) cerrar(); });          // pulsar fuera cierra
    dlg.querySelector('[data-cerrar-presu]').addEventListener('click', cerrar);
    document.addEventListener('click', e => {
      const a = e.target.closest('a[href="#contacto"], [data-abrir-presu]');
      if (!a || dlg.contains(a)) return;
      e.preventDefault();
      abrir(a.dataset.plan);
    });
    // Desde las páginas de servicio se llega con index.html#presupuesto o #presupuesto-LG (deja marcado ese plan)
    // Llegada con index.html#presupuesto o #presupuesto-LG (enlaces antiguos o compartidos): abre la ventana con ese plan marcado
    if (location.hash.startsWith('#presupuesto')) abrir(location.hash.split('-')[1]);
    const msg = document.getElementById('presu-msg');
    const nombres = { '01M': '01M · Mantenimiento', '02MA': '02MA · Mantenimiento Amplio', '03MAS': '03MAS · Amplio Solución',
      '04MASS': '04MASS · Amplio Solución Sostenible', 'LG': 'LG · Limpieza General', 'DES': 'Desinfección', 'NS': 'Aún no lo sé (asesoradme)' };
    presu.addEventListener('submit', async e => {
      e.preventDefault();
      presu.querySelectorAll('.invalido').forEach(x => { x.classList.remove('invalido'); x.removeAttribute('aria-invalid'); });
      const d = new FormData(presu);
      const v = k => (d.get(k) || '').toString().trim();
      const errores = [];
      const marca = el => { el.classList.add('invalido'); el.setAttribute('aria-invalid', 'true'); el.setAttribute('aria-describedby', 'presu-msg'); };
      if (!v('nombre')) { errores.push('tu nombre'); marca(presu.querySelector('#pr-nombre')); }
      const email = v('email'), tel = v('telefono');
      if (!email && !tel) { errores.push('un teléfono o un correo'); marca(presu.querySelector('#pr-tel')); marca(presu.querySelector('#pr-email')); }
      if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { errores.push('un correo válido'); marca(presu.querySelector('#pr-email')); }
      if (!d.get('privacidad')) { errores.push('aceptar el uso de tus datos'); marca(presu.querySelector('.privacidad input')); presu.querySelector('.privacidad').classList.add('invalido'); }
      if (errores.length) { msg.className = 'presu-msg err'; msg.textContent = 'Falta ' + errores.join(', ') + '.'; presu.querySelector('[aria-invalid="true"]').focus(); return; }

      const datos = {
        'Servicio': nombres[v('plan')] || v('plan'), 'Vivienda': v('vivienda'), 'Metros': v('metros'), 'Frecuencia': v('frecuencia'),
        'Extras': d.getAll('extras').join(', ') || '—', 'Nombre': v('nombre'), 'Teléfono': tel || '—', 'Correo': email || '—',
        'Localidad': v('localidad') || '—', 'Mensaje': v('mensaje') || '—'
      };
      const asunto = 'Solicitud de presupuesto · ' + datos['Servicio'] + ' · ' + datos['Nombre'];
      const boton = presu.querySelector('button[type="submit"]');
      boton.disabled = true; msg.className = 'presu-msg'; msg.textContent = 'Enviando…';
      try {
        // Sin cabecera Content-Type (va como texto): Google no acepta la consulta previa del navegador
        const r = await fetch(ENVIO_PRESUPUESTOS, {
          method: 'POST',
          body: JSON.stringify({
            plan: v('plan'), vivienda: v('vivienda'), metros: v('metros'), frecuencia: v('frecuencia'), extras: d.getAll('extras'),
            nombre: v('nombre'), telefono: tel, email: email, localidad: v('localidad'), mensaje: v('mensaje'),
            privacidad: !!d.get('privacidad'), web: v('web')
          })
        });
        const res = await r.json();
        if (!r.ok || !res.ok) throw new Error(res.error || r.status);
        presu.reset(); msg.textContent = '¡Gracias, ' + datos['Nombre'].split(' ')[0] + '! Hemos recibido tu solicitud y te responderemos muy pronto.';
      } catch (err) {
        msg.className = 'presu-msg err';
        msg.innerHTML = 'No se ha podido enviar. Inténtalo de nuevo en unos minutos o escríbenos a <a href="mailto:adm@massolis.com?subject=' +
          encodeURIComponent(asunto) + '">adm@massolis.com</a>.';
      } finally { boton.disabled = false; }
    });
  }

  // Un enlace interno dentro de una ventana la cierra antes de ir a su sección
  document.querySelectorAll('dialog a[href^="#"]').forEach(a => a.addEventListener('click', () => a.closest('dialog').close()));
})();
