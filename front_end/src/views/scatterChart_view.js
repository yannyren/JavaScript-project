var lsqLinear = require( '../services/regression.js' );

var ScatterChart = function( refresh, container ){
   this.series = 0;
   this.data = null;
   this.refresh = refresh;
   this.container = container;
}

ScatterChart.prototype.setData = function( data ){
   this.data = data;
}

ScatterChart.prototype.setSeries = function( series ){
    this.series = series;
}

ScatterChart.pair = function(x, y){
   var pair = [];
   pair.push(x);
   pair.push(y);
   return pair;
}

ScatterChart.showFit = function( data ){
    var gradientText = document.querySelector( '#gradient')
    var predictionText = document.querySelector( '#prediction')    
    var fitCoeffs = lsqLinear( data )
    console.log( "fitCoeffs", fitCoeffs );
    gradientText.innerText = "Rate of change= " + fitCoeffs[0].toFixed(2).toString() + 
    " cents/day";
    predictionText.innerText = "";
    for ( var day = 1; day <= 7; day++){
        var dayPrice = fitCoeffs[0] * day + fitCoeffs[1];
        predictionText.innerText += ( dayPrice.toFixed(1).toString() + ", " );
    }
}

ScatterChart.prototype.render = function(){

   var scatterObjects = [];
  
    console.log( "In scatterChart, this.data", this.data );

    var obj = {};
    obj["name"] = this.data[this.series].name;
    obj["data"] = [];

    for (var j = 0; j < this.data[this.series].pastCloseOfDayPrices.length; j++) {
        var thisPair = ScatterChart.pair( j-6, this.data[this.series].pastCloseOfDayPrices[j] );
        obj["data"].push(thisPair); 
    }
    scatterObjects.push(obj);

    ScatterChart.showFit( scatterObjects[0].data );

    console.log( "scatterObjects[0].data",scatterObjects[0].data );

   var scatterChart = new Highcharts.chart({
      
   chart: {
       type: 'scatter',
       zoomType: 'xy',
       renderTo: this.container
   },
   title: {
       text: this.data[this.series].name
   },
   marginTop: 10,
   spacingTop: 10,
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
           text: 'Closing Price (cents)'
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
                    //    lineColor: 'rgb(100,100,100)'
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
               pointFormat: '{point.x} day, {point.y} cents'
           }
       }
   },
   series: scatterObjects
});

}

module.exports = ScatterChart;