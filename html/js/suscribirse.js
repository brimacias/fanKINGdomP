const usuarioId = 1;
const trabajoId = 1;

document.getElementById("suscribirse-btn").addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:3000/desktop/fankingdomp/html/js/suscribirse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuarioId, trabajoId }),
    });

    if (response.ok) {
      alert("Te has suscrito exitosamente.");
    } else {
      const error = await response.json();
      alert("Error: " + error.error);
    }
  } catch (err) {
    console.error(err);
    alert("Error al procesar la suscripción.");
  }
});
