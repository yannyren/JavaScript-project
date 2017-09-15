var express = require( 'express' );
var server = express();
var bodyParser = require( 'body-parser' );

server.use( function(req, res, next) {
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  next();
});


server.use( bodyParser.json() );
server.use( require( './controllers' ) );

server.listen( 3001, function(){
  console.log( "API server running on port 3001" );
})