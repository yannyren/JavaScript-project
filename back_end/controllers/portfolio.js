var express = require( 'express' );
var portfolioRouter = express.Router();
var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectId = require( 'mongodb' ).ObjectId;

MongoClient.connect( 'mongodb://localhost:27017/stockoverflow', function( err, database ) {
  if ( err ) return;
  db = database;
} );

// INDEX
portfolioRouter.get( '/', function( req, res ) {
  db.collection( 'portfolio' ).find().toArray( function( err, results ) {

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

// CREATE
portfolioRouter.post( '/', function( req, res ) {
  var entry = req.body;
  db.collection( 'portfolio' ).insertOne( entry, function( err, results ){

    if ( err ) {
      console.log( "Error: " + err.toString() );
      res.json( false );
    } else if ( results.result.n === 0 ){
      res.json( false );      
    } else {
      res.json( results.ops[0] );
    }

  });
});

// UPDATE
portfolioRouter.put( '/:id', function( req, res ) {
  var updateEntry = req.body;
  var updateId = ObjectId( req.params.id );
  db.collection( 'portfolio' ).replaceOne( { "_id": updateId }, updateEntry, function( err, results ){

    console.log( results );
    if ( err ) {
      console.log( "Error: " + err.toString() );
      res.json( false );
    } else if ( results.result.n === 0 ){
      res.json( false );      
    } else {
      results.ops[0]._id = ObjectId( updateId );
      res.json( results.ops[0] );
    }

  });
})

// DESTROY
portfolioRouter.delete( '/:id', function( req, res ) {
  var removeId = ObjectId( req.params.id );
  db.collection( 'portfolio' ).remove( { "_id": removeId }, function( err, results ){

    if( err ) {
      console.log( "Error: " + err.toString() );
      res.json( false );
    } else if ( results.result.n === 0 ){
      res.json( false );
    } else {
      res.json( true );
    }

  });
})




module.exports = portfolioRouter;