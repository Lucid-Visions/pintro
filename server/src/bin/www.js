#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from '../app';
import debugLib from 'debug';
import http from 'http';
import { Socket } from 'dgram';
const debug = debugLib('your-project-name:server');

const https = require('https');
const fs = require('fs');



/**
 * Get port from environment and store in Express.
 */

var portHttp = normalizePort(process.env.PORT_HTTP || '3000');
app.set('portHttp', portHttp);
var portHttps = normalizePort(process.env.PORT_HTTPS || '443');
app.set("portHttps", portHttps);


/**
 * Create HTTP server.
 */
var server = http.createServer(app);

// Create socket
const io = require('socket.io')(server);
io.on('connection', socket => {
  console.log("A user connected.");
  // Listen for new messages.
  socket.on('message', message => {
    // Re-emit the fact that a new message has been sent.
    io.emit('newMessage', message);
  })
  socket.on('disconnect', () => console.log("A user disconnected"));
});


/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(portHttp);
server.on('error', onError);
server.on('listening', () => onListening(server));


/**
 * Create HTTPS server
 */
const options = {
  key: fs.readFileSync('/app/src/ssl/key.pem'),
  cert: fs.readFileSync('/app/src/ssl/cert.pem')
};

let httpsServer = https.createServer(options, app);

/**
 * Listen on provided port
 */
httpsServer.listen(portHttps);
httpsServer.on('error', onError);
httpsServer.on('listening', () => onListening(httpsServer));



/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening(serv) {
  var addr = serv.address();
  // var addr = httpsServer.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

