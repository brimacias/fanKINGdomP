const params = new URLSearchParams(window.location.search);
const publicacionId = params.get("id");

if (!publicacionId) {
  alert("No se especificó una publicación.");
} else {
  cargarPublicacion(publicacionId);
}

// Función para cargar detalles de la publicación desde la API
async function cargarPublicacion(id) {
  try {
    const response = await fetch(`http://localhost:3000/publicacion/${id}`);
    if (!response.ok) {
      throw new Error("Publicación no encontrada.");
    }

    const publicacion = await response.json();

    // Insertar los datos en el DOM
    document.getElementById("titulo").textContent = publicacion.titulo;
    document.getElementById("contenido").textContent = publicacion.contenido;
  } catch (err) {
    console.error(err);
    alert("Error al cargar la publicación: " + err.message);
  }
}
