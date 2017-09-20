var lsqLinear = require( '../services/regression.js' );

var TotalChart = function( refresh, container ){
  this.data = null;
  this.refresh = refresh;
  this.container = container;
}

TotalChart.prototype.setData = function( data ){
    console.log( "data at setData for TotalChart", data)
  this.data = data;
}

TotalChart.pair = function(x, y){
  var pair = [];
  pair.push(x);
  pair.push(y);
  return pair;
}

TotalChart.showFit = function( data ){
  var gradientText = document.querySelector( '#total-gradient')
  var predictionText = document.querySelector( '#total-prediction')    
  var fitCoeffs = lsqLinear( data )
  console.log( "fitCoeffs", fitCoeffs );
  gradientText.innerText = "Rate of change= " + fitCoeffs[0].toFixed(2).toString() + 
  " dollars/day";
  predictionText.innerText = "";
  for ( var day = 1; day <= 7; day++){
      var dayPrice = fitCoeffs[0] * day + fitCoeffs[1];
      predictionText.innerText += ( dayPrice.toFixed(1).toString() + ", " );
  }
}

TotalChart.prototype.render = function(){
  
    console.log( "On TotalChart render, data=", this.data)

     var scatterObjects = [];
    
      var obj = {};
      obj["name"] = "Total Valuation"
      obj["data"] = [];
  
      //first loop over days
      for ( var day = 0; day < this.data[0].pastCloseOfDayPrices.length; day++ ){

        var dayTotal = 0.0;
        //now loop over shares
        for ( var share = 0; share < this.data.length; share++ ) {
          var shareDayPrice = this.data[ share ].pastCloseOfDayPrices[ day ];
          var shareQuantity = this.data[ share ].quantity
          dayTotal += shareDayPrice * shareQuantity / 100;
        }

        var thisPair = TotalChart.pair( day - 6, dayTotal );
        obj["data"].push(thisPair);

      }

      scatterObjects.push(obj);
  
      TotalChart.showFit( scatterObjects[0].data );
  
      console.log( "scatterObjects[0].data",scatterObjects[0].data );
  
     var totalChart = new Highcharts.chart({
        
     chart: {
         type: 'scatter',
         zoomType: 'xy',
         renderTo: this.container
     },
     title: {
         text: 'Total Trend'
        //  enabled: false
     },
     credits:
     {
       enabled: false
     },
     subtitle: {
         text: ''
     },
     xAxis: {
         gridLineWidth: 0,
         tickLength: 5,
         tickWidth: 2,
         tickPosition: 'outside',
         title: {
             text: 'Time (days) '
         },
         lineWidth: 2,
         startOnTick: false,
         endOnTick: false,
         showLastLabel: true
     },
     yAxis: {
         gridLineWidth: 0,
         tickLength: 5,
         tickWidth: 2,
         tickPosition: 'outside',
         title: {
             text: 'Total Valuation ($)'
         },
         lineWidth: 2,
         startOnTick: true,
         endOnTick: true,
         showLastLabel: true
     },
     legend: {
         enabled: false
     },
     plotOptions: {
         scatter: {
             marker: {
                 radius: 5,
                 states: {
                     hover: {
                         enabled: false
                        //  lineColor: 'rgb(100,100,100)'
                     }
                 }
             },
             states: {
                 hover: {
                     marker: {
                         enabled: false
                     }
                 }
             },
             tooltip: {
                 headerFormat: '<b>{series.name}</b><br>',
                 pointFormat: '{point.x} day, {point.y} $'
             }
         }
     },
     series: scatterObjects
  });
  
  }
  
  module.exports = TotalChart;