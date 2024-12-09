const usuarioId = 1;

async function cargarSuscripciones() {
  try {
    const response = await fetch(`http://localhost:3000/api/suscripciones/${usuarioId}`);
    const suscripciones = await response.json();

    const lista = document.getElementById("suscripciones-lista");
    suscripciones.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.titulo} (${item.tipo})`;
      lista.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Error al cargar suscripciones.");
  }
}

cargarSuscripciones();
