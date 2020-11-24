// Definir funciones que queremos que se disparen recibamos información del servidor o cuando queramos
// enviar información al servidor.

//Usamos var para aumentar la compatibilidad con navegadores. io() es una función de la libreria importada
//arriba 'socket.io.js'
var socket = io();

// Cuando se conecte con el servidor socket.io. Al ejecutarse esto nuestro frontend estará pendiente de
// cualquier cambio que ocurra en el backend.
// on() = escuchar sucesos
socket.on('connect', function() {
    console.log('Conectado al servidor');
});

// Se ejecuta cuando se pierde conexión con el servidor
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// .emit() se usa para enviar información al servidor
socket.emit('enviarMensaje', {
    user: 'Fernando',
    message: 'Hola mundo'
}, function(resp) {
    console.log('Server response: ', resp);
});

// Listen information
socket.on('enviarMensaje', function(resp) {
    console.log('Server: ', resp);
});