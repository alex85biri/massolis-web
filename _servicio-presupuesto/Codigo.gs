// Servicio de envío del formulario de presupuesto de massolis.com.
// Vive en Google Apps Script, en la cuenta adm@massolis.com (Google Workspace de la empresa),
// publicado como «Aplicación web» (se ejecuta como adm@, acceso: cualquier usuario).
// Recibe la solicitud desde la web y la envía por correo a adm@massolis.com.
// Si se cambia este archivo, hay que pegarlo en el proyecto de Apps Script y publicar una versión nueva
// en Implementar → Gestionar implementaciones → editar → Versión: nueva (la dirección no cambia).

var DESTINO = 'adm@massolis.com';
var MAX_POR_HORA = 30; // tope de solicitudes por hora, contra envíos masivos

var SERVICIOS = {
  '01M': '01M · Mantenimiento', '02MA': '02MA · Mantenimiento Amplio', '03MAS': '03MAS · Amplio Solución',
  '04MASS': '04MASS · Amplio Solución Sostenible', 'LG': 'LG · Limpieza General', 'DES': 'Desinfección',
  'NS': 'Aún no lo sé (asesoradme)'
};

function respuesta(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function texto(x, max) {
  return (typeof x === 'string' ? x : '').trim().slice(0, max || 200);
}

function html(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function doGet() {
  return respuesta({ ok: true, servicio: 'presupuesto massolis.com' });
}

function doPost(e) {
  var d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return respuesta({ ok: false, error: 'datos' }); }

  // Campo trampa: las personas no lo ven; si viene relleno es un robot. Se responde bien y no se envía nada.
  if (texto(d.web)) return respuesta({ ok: true });

  var nombre = texto(d.nombre, 120), email = texto(d.email, 160), telefono = texto(d.telefono, 40);
  if (!nombre || (!email && !telefono) || d.privacidad !== true) return respuesta({ ok: false, error: 'faltan' });
  if (email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return respuesta({ ok: false, error: 'correo' });

  // Tope por hora (cuenta compartida por todas las visitas)
  var cache = CacheService.getScriptCache();
  var clave = 'envios-' + Utilities.formatDate(new Date(), 'Etc/UTC', 'yyyyMMddHH');
  var n = Number(cache.get(clave) || 0);
  if (n >= MAX_POR_HORA) return respuesta({ ok: false, error: 'limite' });
  cache.put(clave, String(n + 1), 3600);

  var extras = Array.isArray(d.extras) ? d.extras.map(function (x) { return texto(x, 60); }).filter(String).slice(0, 10).join(', ') : '';
  var datos = [
    ['Servicio', SERVICIOS[texto(d.plan, 20)] || texto(d.plan, 60) || '—'],
    ['Vivienda', texto(d.vivienda, 60) || '—'],
    ['Metros', texto(d.metros, 20) || '—'],
    ['Frecuencia', texto(d.frecuencia, 40) || '—'],
    ['Extras', extras || '—'],
    ['Nombre', nombre],
    ['Teléfono', telefono || '—'],
    ['Correo', email || '—'],
    ['Localidad', texto(d.localidad, 120) || '—'],
    ['Mensaje', texto(d.mensaje, 3000) || '—']
  ];
  var filas = datos.map(function (f) {
    return '<tr><th style="text-align:left;padding:6px 12px;background:#EEF3FB;color:#0E1F4D;vertical-align:top">' + f[0] +
      '</th><td style="padding:6px 12px;white-space:pre-wrap">' + html(f[1]) + '</td></tr>';
  }).join('');

  var correo = {
    to: DESTINO,
    name: 'Web MASSolis',
    subject: 'Solicitud de presupuesto · ' + datos[0][1] + ' · ' + nombre,
    body: 'Nueva solicitud de presupuesto desde massolis.com.\n\n' + datos.map(function (f) { return f[0] + ': ' + f[1]; }).join('\n'),
    htmlBody: '<div style="font-family:Arial,sans-serif;font-size:14px;color:#1B2440">' +
      '<p>Nueva solicitud de presupuesto desde massolis.com.</p>' +
      '<table style="border-collapse:collapse;border:1px solid #DCE3F0">' + filas + '</table>' +
      (email ? '<p>Para responder, pulsa «Responder»: el correo irá a ' + html(email) + '.</p>'
             : '<p>La persona no ha dejado correo: llámala al teléfono indicado.</p>') +
      '</div>'
  };
  if (email) correo.replyTo = email;

  try {
    MailApp.sendEmail(correo);
  } catch (err) {
    console.error('No se pudo enviar: ' + err);
    return respuesta({ ok: false, error: 'envio' });
  }
  return respuesta({ ok: true });
}
