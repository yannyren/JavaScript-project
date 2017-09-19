var DateParser = require( './date_parser' );
var AjaxRequest = require( './ajax_request' );
var APIKey = require( '../APIKeys.js' );

var ShareUpdater = function(){
  this.shares = shares;
  this.portfolioUrl = "http://localhost:3001/api/portfolio";
  this.minuteArrayLength = 8 * 60;
  this.dayArrayLength = 7;
  this.weekArrayLength = 6;
  this.monthArrayLength = 12;
}

ShareUpdater.prototype.update = function( shares ){
  this.shares = shares;
  this.shares.forEach( function( share ){

    var dateNow = new Date();
    var dateLastUpdate = share.dateLastUpdate;
    var epic = share.epic;
    

    var days = DateParser.getNumWorkingDayEnds( dateLastUpdate, dateNow );
    if ( days > 0 ){    
    
      var dayURL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=";
      dayURL += epic + "&apikey=" + APIKey.getAPIKey();
    
      var dayRequest = new AjaxRequest( dayURL );
    
      dayRequest.get( function( data ){
        var timeSeries = data[ "Time Series (Daily)" ];
        //get entry dates in time series
        var timeSeriesDates = Object.keys( timeSeries );
        timeSeriesDates.sort();
        var timeSeriesLength = timeSeriesKeys.length;
        //limited by data returned from api
        if ( days > ( timeSeriesLength - 1 ) ) days = timeSeriesLength - 1;
        //update price with most recent entry
        share.price = timeSeries[ timeSeriesDates[0] ]["4. close"];
    
        for( var count = 1; count < days; count++ ){
          var date = timeSeriesDates[ count ];
          var price = timeSeries[ date ]["4. close"];
          share.pastDayPrices.push[ price ];
          if ( share.pastDayPrices.length > this.dayArrayLength ) {
            share.pastDayPrices.shift();
          } 
        }

      });

    };

  });
}

module.exports = ShareUpdater;
