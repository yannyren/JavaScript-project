var express = require( 'express' );
var sharesRouter = express.Router();
var MongoClient = require( 'mongodb' ).MongoClient;

MongoClient.connect( 'mongodb://localhost:27017/stockoverflow', function( err, database ) {
  if ( err ) return;
  db = database;
});

// INDEX
sharesRouter.get( '/', function( req, res ) {
  db.collection( 'shares' ).find().toArray( function( err, results ) {

    if( err ) {
      console.log( "Error: " + err.toString() );
      res.json( false );
    } else if ( results.length === 0 ) {
      res.json( false );
    } else {
      res.json( results );
    }

  });
});


module.exports = sharesRouter;