const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();

// Configurar middleware de CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());


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
    const sql = 'INSERT INTO usuarios (nombre, email, contrasenya) VALUES (?, ?, ?)';

    conexion.query(sql, [nombreUsuario, correoElectronico, contrasenya], (error, resultados) => {
        if (error) {
            console.error('Error al registrar el usuario:', error);
            res.status(500).send('Error al registrar el usuario');
        } else {
            res.status(201).send('Usuario registrado exitosamente');
        }
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log(`Servidor corriendo en http://localhost:${3000}`);
});

