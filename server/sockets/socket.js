const { io } = require('../server');

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
    client.on('enviarMensaje', (data /*, callback*/ ) => {

        console.log(data);

        // Enviamos el mensaje recibido a todos los usuarios conectados ya que escuchan 'enviarMensaje'
        client.broadcast.emit('enviarMensaje', data);

        // if (message.user) {
        //     callback({
        //         resp: 'Todo salió bien'
        //     });
        // } else {
        //     callback({
        //         resp: 'Algo salió mal'
        //     });
        // }

    });

});