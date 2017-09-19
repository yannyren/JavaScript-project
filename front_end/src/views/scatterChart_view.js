var ScatterChart = function( refresh, container ){
   this.data = null;
   this.refresh = refresh;
   this.container = container;
}

ScatterChart.prototype.setData = function( data ){
   this.data = data;
}

ScatterChart.pair = function(x, y){
   var pair = [];
   pair.push(x);
   pair.push(y);
   return pair;
}

ScatterChart.prototype.render = function(){

   var scatterObjects = [];
  
   for (var i = 0; i < this.data.length; i++) {
       var obj = {};
       obj["name"] = this.data[i].name;
       obj["data"] = [];

           for (var j = 0; j < this.data[i].pastCloseOfDayPrices.length; j++) {
               var thisPair = ScatterChart.pair( j+1, this.data[i].pastCloseOfDayPrices[j] );
               obj["data"].push(thisPair); 
           }
           scatterObjects.push(obj);
   }

   var scatterChart = new Highcharts.chart({
      
   chart: {
       type: 'scatter',
       zoomType: 'xy',
       renderTo: this.container
   },
   title: {
       text: 'Revenue vs Day'
   },
   subtitle: {
       text: ''
   },
   xAxis: {
       title: {
           enabled: true,
           text: 'Time'
       },
       startOnTick: true,
       endOnTick: true,
       showLastLabel: true
   },
   yAxis: {
       title: {
           text: 'Closing Price'
       }
   },
   legend: {
       layout: 'vertical',
       align: 'left',
       verticalAlign: 'top',
       x: 100,
       y: 70,
       floating: true,
       backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
       borderWidth: 1
   },
   plotOptions: {
       scatter: {
           marker: {
               radius: 5,
               states: {
                   hover: {
                       enabled: true,
                       lineColor: 'rgb(100,100,100)'
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
               pointFormat: '{point.x} cm, {point.y} kg'
           }
       }
   },
   series: scatterObjects
});

}

module.exports = ScatterChart;