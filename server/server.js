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

// Inicializar socket.io. IO = esta es la comunicación del backend
let io = socketIO(server);
// Cada vez que se produce una conexión al servidor de un nuevo cliente. El objeto 'client' tiene toda la 
// información de la conexión y del pc que se conectó
io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.emit('enviarMensaje', {
        user: 'Admin',
        message: 'Welcome to this app'
    });

    // Cada vez que el cliente se desconecta
    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Escuchando 'enviarMensaje' del cliente
    client.on('enviarMensaje', (message) => {
        console.log(message);
    });

});

server.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});