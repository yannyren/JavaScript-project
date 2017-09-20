var HTTPRequest = require( './http' );
var MongoClient = require( 'mongodb' ).MongoClient;
var ObjectId = require( 'mongodb' ).ObjectId;

MongoClient.connect( 'mongodb://localhost:27017/stockoverflow', function( err, database ) {
  if ( err ) return;
  db = database;
} );

var ShareUpdater = function( url ){
  this.url = url;
}

ShareUpdater.updateNeeded = function( share ){
  var now = new Date();
  var lastUpdated = new Date( share.lastUpdated );
  var daysSinceUpdate = Math.floor( ( now - lastUpdated ) / ( 24 * 60 * 60 * 1000 ) );
  return ( daysSinceUpdate > 1 );
}

ShareUpdater.prototype.update = function( share, callback ){
  httpRequest = new HTTPRequest( this.url );
  httpRequest.get( function( shareData ){
    
    console.log("share before", share );
    
    var dates = Object.keys( shareData[ "Time Series (Daily)" ]);
    share.lastUpdated = new Date().toISOString();
    dates.sort().reverse();
    
    share.pastCloseOfDayPrices = [];
    share.price = Number( shareData[ "Time Series (Daily)" ][ dates[0] ]["4. close"] );
    for ( var i = 0; i < 7; i++ ){
      var thisPrice = Number( shareData[ "Time Series (Daily)" ][ dates[i] ]["4. close"] );
      share.pastCloseOfDayPrices.unshift( thisPrice )
    }
    console.log("share after", share );
    console.log("ObjectId is", ObjectId(share["_id"]))
    db.collection( 'portfolio' ).update( { _id: ObjectId(share["_id"]) }, share);


    callback( share );
  })
}

module.exports = ShareUpdater;