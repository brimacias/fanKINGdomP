const mysql = require('mysql2');

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

module.exports = pool;