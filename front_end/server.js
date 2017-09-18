var express = require( 'express' );
var server = express();
var router = express.Router();
server.use( express.static( 'build' ) );

server.listen( 3000, function(){
  console.log( "Front end server running on port 3000" );
});

router.get( '/', function( req, res ){
  res.sendFile( __dirname + '/build/index.html' );
});