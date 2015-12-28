var express = require( 'express' );
var app = express();

app.get( '/', function ( request, response ) {
   response.send( 'Hello world!' );
});

var server = app.listen( 1337, function () {
   var host = server.address().address === '' ? server.address().address : '127.0.0.1';
   var port = server.address().port;
   
   console.log( 'A server is started at http://' + host + ':' + port );
});