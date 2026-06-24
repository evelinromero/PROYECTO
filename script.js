document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-contacto');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();

    if (!nombre || !email || !mensaje) {
      mostrarMensaje('Por favor completa todos los campos.', 'error');
      return;
    }

    if (!validarEmail(email)) {
      mostrarMensaje('Escribe un correo electrónico válido.', 'error');
      return;
    }

    guardarEnStorage({ nombre, email, mensaje });

    mostrarMensaje('¡Mensaje enviado correctamente!', 'exito');

    form.reset();
  });
});

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function mostrarMensaje(texto, tipo) {
  const el = document.getElementById('msg-respuesta');
  el.textContent = texto;
  el.className = tipo === 'error' ? 'msg-error' : 'msg-exito';
}

function guardarEnStorage(data) {
  const mensajes = JSON.parse(localStorage.getItem('mensajes-contacto')) || [];

  data.fecha = new Date().toLocaleString();

  mensajes.push(data);

  localStorage.setItem('mensajes-contacto', JSON.stringify(mensajes));
}

function verMensajesGuardados() {
  const contenedor = document.getElementById('mensajes-guardados');
  const mensajes = JSON.parse(localStorage.getItem('mensajes-contacto')) || [];

  if (mensajes.length === 0) {
    contenedor.innerHTML = '<p>No hay mensajes guardados.</p>';
    return;
  }

  let html = '<h3>Mensajes Guardados</h3>';

  mensajes.forEach((msg, index) => {
    html += `
      <div class="mensaje-card">
        <p><strong>${index + 1}. ${msg.nombre}</strong></p>
        <p>Correo: ${msg.email}</p>
        <p>Mensaje: ${msg.mensaje}</p>
        <p><small>${msg.fecha}</small></p>
      </div>
    `;
  });

  contenedor.innerHTML = html;
}
