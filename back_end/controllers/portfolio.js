var express = require( 'express' );
var portfolioRouter = express.Router();
var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectId = require( 'mongodb' ).ObjectId;
var ShareUpdater = require( '../services/share_updater' );
var APIKey = require( '../services/api_key' );
var HTTP = require( '../services/http' );
var apiKey = new APIKey();

MongoClient.connect( 'mongodb://localhost:27017/stockoverflow', function( err, database ) {
  if ( err ) return;
  db = database;
} );

var EventCollectorAccumulator = function( reqCount, accumulator, callback ){
  var reqCount = reqCount;
  var accumulator = accumulator;
  var count = 0;
  var callback = callback;

  return function( data ){
    console.log( "Accumulator called" );
    accumulator.push( data );
    count++;
    if ( count === reqCount ) callback( accumulator );
  }

}


// INDEX
portfolioRouter.get( '/', function( req, res ) {
  db.collection( 'portfolio' ).find().toArray( function( err, results ) {

    if( err ) {
   
      console.log( "Error: " + err.toString() );
      res.json( false );
   
    } else if ( results.length === 0 ) {
   
      res.json( false );
   
    } else {

      var resultsUpdated = [];
      var resultsToUpdate = [];

      results.forEach( function( share, index ){
        if ( ShareUpdater.updateNeeded( share ) ) {
          resultsToUpdate.push( index );
        } else {
          resultsUpdated.push( share );
        }
      })

      //how many shares need updated?
      var numUpdate = resultsToUpdate.length;

      // if none, post back immediately
      if ( numUpdate === 0 ) res.json( resultsUpdated );

      //otherwise, update needed.
      //create collectorAccumulator for these shares, set as res on complete
      var collectAccumulate = new EventCollectorAccumulator( numUpdate, resultsUpdated, function( data ){
        res.json( data );
      })

      resultsToUpdate.forEach( function( shareIndex ){
        var shareAPIString = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&apikey="
        shareAPIString += apiKey.getKey() + "&symbol=" + results[ shareIndex ].epic;
        var shareUpdater = new ShareUpdater( shareAPIString );
        shareUpdater.update( results[ shareIndex ], function( share ){
          collectAccumulate( share );
        })
      })
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