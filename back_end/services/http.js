var https = require( "https" );

var HTTPRequest = function( url ){
  this.url = url;
}

HTTPRequest.prototype.get = function( callback ){
  console.log( "Got to HTTPRequest.get" );
  https.get( this.url, function( result ){
    result.setEncoding( "utf8" );
    
    let body = "";
    result.on( "data", function( data ){
      body += data;
    });

    result.on( "end", function(){
      body = JSON.parse( body )
      callback( body ); 
    })


  })
}

module.exports = HTTPRequest;