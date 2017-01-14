var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var morgan = require('morgan');
var path = require('path');
var config = require('./config/configs');
var debug = require('debug')('workspace:server');
var http = require('http').Server(app);
var io = require('socket.io')(http);



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});



app.use(morgan('dev'));
app.use('/public', express.static(__dirname+ '../public'));
/*app.use('/lib', intercept,express.static(__dirname+ '../node_modules'));*/
app.use('/lib', intercept, express.static(('bower_components')));
function intercept(req,res,next){
	console.log('the lib route is being requested');
	next();
}


app.use('/', function (req, res) {
  console.log('only the index file is being returned');
  res.sendFile('./index.html',{ root: path.join(__dirname, '../public/views') });
})



var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http;

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);




// Socket io connection, 
// for real time server

io.on('connection', function(socket){
	console.log('there was a connection!!!');

})





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

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}