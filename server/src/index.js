import express from 'express'
import http from 'http'
import socketio from 'socket.io'

import ApplyMiddleware from './middleware'

const app = ApplyMiddleware(express())
const server = http.createServer(app)
const io = socketio(server)

io.on('connection', socket => {
    socket.on('message', message => {
        // Re-emit the fact that a new message has been sent.
        io.emit('newMessage', message);
    });
})

const port = process.env.PORT_HTTP | 3000
server.listen(port)
console.log(`API listening on ${port}`)

export default app
