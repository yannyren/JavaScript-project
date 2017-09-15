var express = require( 'express' );
var sharesRouter = express.Router();
var MongoClient = require( 'mongodb' ).MongoClient;

MongoClient.connect( 'mongodb://localhost:27017/stockoverflow', function( err, database ) {
  if ( err ) return;
  db = database;
} );

sharesRouter.get( '/', function( req, res ) {
  db.collection( 'sample' ).find().toArray( function( err, results ) {
    if( err ) console.log( "Error: " + err.toString() );
    res.json( results );
  });
});

module.exports = sharesRouter;