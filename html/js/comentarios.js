const usuarioId = 1;

document.getElementById("btn-comentar").addEventListener("click", async () => {
  const contenido = document.getElementById("comentario").value;

  if (!contenido.trim()) {
    alert("El comentario no puede estar vacío.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/api/comentarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId, publicacionId, contenido }),
    });

    if (response.ok) {
      document.getElementById("comentario").value = ""; // Limpia el textarea
      cargarComentarios(); // Recarga los comentarios
    } else {
      const error = await response.json();
      alert("Error: " + error.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error al agregar comentario.");
  }
});
