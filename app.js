var compression = require( 'compression' );
var body_parser = require( 'body-parser' );
var express = require( 'express' );
var app = express();
var router = express.Router();

router.use( body_parser.json() );
router.use( body_parser.urlencoded({
   extended : true
}));

// Use Gzip compression
router.use( compression() );

// Use /dist folder to load static files
router.use( express.static( __dirname + '/dist' ) );

// Handles the 'homepage' path
router.get( '/', function ( request, response ) {
   response.sendFile( 'index.html', {
      root : __dirname + '/views/'
   });
});

router.post( '/', function( request, response ) {
   response.send( request.body.foo );
});

// Create a middleware that handles a response for the 404 page
router.use( function ( request, response, next ) {
   response.status( 404 ).send( 'Page Not Found!' );
});

app.use( '/', router );

var server = app.listen( 1337, function () {
   var host = server.address().address === '' ? server.address().address : '127.0.0.1';
   var port = server.address().port;
   
   console.log( 'A server is started at http://' + host + ':' + port );
   console.log( 'Current dir: ' + __dirname );
});