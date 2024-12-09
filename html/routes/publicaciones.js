const express = require("express");
const db = require("../server");
const router = express.Router();

// Ruta para obtener una publicación
router.get("/publicacion/:publicacionId", async (req, res) => {
  const { publicacionId } = req.params;
  try {
    const [publicacion] = await db.query(
      "SELECT * FROM publicaciones WHERE publicacionId = ?",
      [publicacionId]
    );
    if (publicacion.length === 0) {
      return res.status(404).json({ error: "Publicación no encontrada." });
    }
    res.status(200).json(publicacion[0]);
  } catch (error) {
    console.error("Error al obtener la publicación:", error);
    res.status(500).json({ error: "Error al obtener la publicación." });
  }
});

// Ruta para obtener los comentarios de una publicación
router.get("/comentarios/:publicacionId", async (req, res) => {
  const { publicacionId } = req.params;
  try {
    const [comentarios] = await db.query(
      `
      SELECT c.comentarioId, c.contenido, c.fecha, u.nombre AS autor
      FROM comentarios c
      INNER JOIN usuarios u ON c.usuarioId = u.usuarioId
      WHERE c.publicacionId = ?
      ORDER BY c.fecha DESC
      `,
      [publicacionId]
    );
    res.status(200).json(comentarios);
  } catch (error) {
    console.error("Error al obtener los comentarios:", error);
    res.status(500).json({ error: "Error al obtener los comentarios." });
  }
});

// Ruta para agregar un comentario
router.post("/comentarios", async (req, res) => {
  const { usuarioId, publicacionId, contenido } = req.body;
  try {
    await db.query(
      "INSERT INTO comentarios (usuarioId, publicacionId, contenido) VALUES (?, ?, ?)",
      [usuarioId, publicacionId, contenido]
    );
    res.status(201).json({ message: "Comentario agregado con éxito." });
  } catch (error) {
    console.error("Error al agregar comentario:", error);
    res.status(500).json({ error: "Error al agregar el comentario." });
  }
});

module.exports = router;
