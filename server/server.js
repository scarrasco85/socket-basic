const express = require('express');
const socketIO = require('socket.io');
// socket.io no trabaja por defecto con express para montar el servidor, sino que trabaja con el módulo que 
// viene por defecto en nodeJS 'http'. Aquí vamos a montar un servidor Socket usando 'Express'.
const http = require('http');

const path = require('path');

const app = express();
// Express está basado en 'http', tras las cortinas usa funciones de 'http', por eso mismo mandando la configuración
// de express en http va a funcionar para levantar el servidor
// Mounting socket server
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// Inicializar socket.io. IO = esta es la comunicación del backend y exportarla para usarla en el archivo sockets.js
// Para separar la lógica
module.exports.io = socketIO(server);
// Hay que importar la lógica del socket
require('./sockets/socket');

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});