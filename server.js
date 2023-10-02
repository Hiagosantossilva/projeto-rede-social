const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(__dirname)); // Servir arquivos estáticos

io.on('connection', (socket) => {
    console.log('Um usuário conectou ao chat.');

    socket.on('mensagem', (mensagem) => {
        io.emit('mensagem', mensagem); // Envia a mensagem para todos os clientes conectados
    });

    socket.on('disconnect', () => {
        console.log('Um usuário desconectou do chat.');
    });
});

server.listen(3000, () => {
    console.log('Servidor WebSocket iniciado na porta 3000.');
});
