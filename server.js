const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 3000;

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // Cambia esto si tienes otro usuario
    password: "", // Añade tu contraseña si tienes una
    database: "fanKingdom"
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        process.exit(1);
    }
    console.log("Conexión a la base de datos establecida.");
});

// Ruta para registrar un usuario
app.post("/api/usuarios/registro", async (req, res) => {
    const { nombreUsuario, correoElectronico, contrasenya } = req.body;

    // Validar los datos
    if (!nombreUsuario || !correoElectronico || !contrasenya) {
        return res.status(400).send("Todos los campos son obligatorios.");
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contrasenya, 10);

        // Insertar el usuario en la base de datos
        const sql = "INSERT INTO usuarios (nombreUsuario, correoElectronico, contrasenya) VALUES (?, ?, ?)";
        db.query(sql, [nombreUsuario, correoElectronico, hashedPassword], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).send("El correo electrónico ya está registrado.");
                }
                return res.status(500).send("Error al registrar el usuario.");
            }
            res.status(200).send("Usuario registrado con éxito.");
        });
    } catch (error) {
        console.error("Error al procesar el registro:", error);
        res.status(500).send("Ocurrió un error al registrar el usuario.");
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
