var express = require( 'express' );
var app = express();

// Use /dist folder to load static files
app.use( express.static( __dirname + '/dist' ) );

// Get the request timestamp in the middleware
app.use( function ( request, response, next ) {
   request.requestTime = Date();
   next();
});

// Handles the 'homepage' path
app.get( '/', function ( request, response ) {
   var responseText = 'Hello world!<br/>';
   responseText += 'Requested at ' + request.requestTime;
   response.send( responseText );
});

// Create a middleware that handles a response for the 404 page
app.use( function ( request, response, next ) {
   response.status( 404 ).send( 'Page Not Found!' );
});

var server = app.listen( 1337, function () {
   var host = server.address().address === '' ? server.address().address : '127.0.0.1';
   var port = server.address().port;
   
   console.log( 'A server is started at http://' + host + ':' + port );
   console.log( 'Current dir: ' + __dirname );
});