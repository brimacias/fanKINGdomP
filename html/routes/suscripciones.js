const express = require("express");
const db = require("../server");
const router = express.Router();

// Ruta para suscribirse
router.post("/suscribirse", async (req, res) => {
  const { usuarioId, trabajoId } = req.body;

  try {
    const [publicacion] = await db.query(
      "SELECT tipo FROM publicaciones WHERE publicacionId = ?",
      [trabajoId]
    );

    if (publicacion.length === 0) {
      return res.status(404).json({ error: "Publicación no encontrada." });
    }

    const tipoTrabajo = publicacion[0].tipo;

    await db.query(
      "INSERT INTO suscripciones (usuarioId, trabajoId, tipoTrabajo) VALUES (?, ?, ?)",
      [usuarioId, trabajoId, tipoTrabajo]
    );

    res.status(200).json({ message: "Suscripción creada exitosamente." });
  } catch (error) {
    console.error("Error al suscribirse:", error);
    res.status(500).json({ error: "Error al suscribirse." });
  }
});

// Ruta para obtener suscripciones
router.get("/suscripciones/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    const [suscripciones] = await db.query(
      `
      SELECT p.publicacionId, p.titulo, p.tipo
      FROM suscripciones s
      INNER JOIN publicaciones p ON s.trabajoId = p.publicacionId
      WHERE s.usuarioId = ?
      `,
      [usuarioId]
    );

    res.status(200).json(suscripciones);
  } catch (error) {
    console.error("Error al obtener suscripciones:", error);
    res.status(500).json({ error: "Error al obtener suscripciones." });
  }
});

module.exports = router;
