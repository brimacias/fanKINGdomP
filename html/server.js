const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const http = require("http");
const mysql = require('mysql');
const { Server } = require("socket.io");
const router = express.Router();
const suscripcionesRoutes = require("./routes/suscripciones");
const publicacionesRoutes = require("./routes/publicaciones");

const app = express();
const server = http.createServer(app);
const io = new Server(server);



// Configurar middleware de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// Middleware
app.use(bodyParser.json());

app.use("/", suscripcionesRoutes);

app.use("/", publicacionesRoutes);


// Configurar la conexión a la base de datos
const conexion  = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "pipastijuana",
    database: "fanKingdom"
});

// Conectar a la base de datos
conexion.connect((error) => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conectado a la base de datos');
    }
});


// Ruta para registrar un usuario
app.post("/Desktop/fanKINGdomP/html", async (req, res) => {
    const { nombreUsuario, correoElectronico, contrasenya } = req.body;
    const sql = 'INSERT INTO usuarios (nombreUsuario, correoElectronico, contrasenya) VALUES (?, ?, ?)';

    conexion.query(sql, [nombreUsuario, correoElectronico, contrasenya], (error, resultados) => {
        if (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Error al registrar el usuario');
        } else {
            res.status(201).send('Usuario registrado exitosamente');
        }
    });
});

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    try {
      const [rows] = await db.query("SELECT * FROM usuarios");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});
  

// Obtener comunidades
app.get("/comunidades", async (req, res) => {
    try {
      const [rows] = await db.query(
        `SELECT c.comunidadId, c.nombreComunidad, c.descripcion, u.nombreUsuario as moderador
         FROM comunidades c
         LEFT JOIN usuarios u ON c.moderadorId = u.usuarioId`
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener comunidades" });
    }
  });

  // Crear una nueva comunidad
  app.post("/comunidades", async (req, res) => {
    const { nombreComunidad, categoriaGeneral, descripcion, moderadorId } = req.body;

    try {
      const [result] = await db.query(
        `INSERT INTO comunidades (nombreComunidad, categoriaGeneral, descripcion, moderadorId) 
         VALUES (?, ?, ?, ?)`,
        [nombreComunidad, categoriaGeneral, descripcion, moderadorId]
      );
      res.status(201).json({ id: result.insertId, message: "Comunidad creada exitosamente" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear la comunidad" });
    }
  });



// Chat

// Servir archivos estáticos (frontend)
app.use(express.static("public"));

// Manejo de conexiones Socket.IO
io.on("connection", (socket) => {
  console.log("Un usuario se ha conectado:", socket.id);

  // Recibir mensaje del cliente
  socket.on("chatMessage", (msg) => {
    console.log("Mensaje recibido:", msg);

    // Enviar mensaje a todos los usuarios conectados
    io.emit("chatMessage", msg);
  });

  // Detectar desconexión
  socket.on("disconnect", () => {
    console.log("Un usuario se ha desconectado:", socket.id);
  });
});


// Ruta para suscribirse a una publicación
router.post("/suscribirse", async (req, res) => {
    const { usuarioId, publicacionId } = req.body;
  
    try {
      const [result] = await db.query(
        "INSERT INTO suscripciones (usuarioId, trabajoId, tipoTrabajo) VALUES (?, ?, (SELECT tipo FROM publicaciones WHERE publicacionId = ?))",
        [usuarioId, publicacionId, publicacionId]
      );
      res.status(200).json({ message: "Suscripción creada exitosamente", id: result.insertId });
    } catch (error) {
      console.error("Error al crear suscripción:", error);
      res.status(500).json({ error: "Error al crear la suscripción" });
    }
});
  


// Ruta para obtener las suscripciones de un usuario
router.get("/suscripciones/:usuarioId", async (req, res) => {
    const { usuarioId } = req.params;
  
    try {
      const [rows] = await db.query(
        `SELECT p.publicacionId, p.titulo, p.tipo
         FROM suscripciones s
         INNER JOIN publicaciones p ON s.trabajoId = p.publicacionId
         WHERE s.usuarioId = ?`,
        [usuarioId]
      );
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error al obtener suscripciones:", error);
      res.status(500).json({ error: "Error al obtener las suscripciones" });
    }
});
  

module.exports = router;


// Manejo de errores 404
app.use((req, res) => {
res.status(404).json({ error: "Endpoint no encontrado" });
});



// Iniciar el servidor
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:${3000}`);
});
