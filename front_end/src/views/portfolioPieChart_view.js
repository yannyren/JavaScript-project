
  //Build the chart
// var PieChart = function(title, data)
var PieChart = function() { 

}

PieChart.prototype.render = function(stockData) {
    
    var container = document.getElementById("pieChart");
    
    var filler = function(stockData){
      var portfolioDataArray = []

      for (var stock of stockData) {
        var stockDetails = {name: "Shares", data: [ {name: stock.name, y: stock.price * stock.amount}]}
          portfolioDataArray.push(stockDetails);
      }
    };

    var chart = new Highcharts.Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: container
      },
      title: { 
        text: 'Portfolio Summary'
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          },
          connectorColor: 'silver'
          }
        }
      },
      series: [{
        name: 'Shares',
        data: [
          {
            name: "Fusionex",
            y: 240000 //price * quantity
          },
          {
            name: "Empiric Student Prop",
            y: 392000,
            sliced: true,
            selected: true
          
          },
          {
            name: "Worldpay",
            y: 310000
      
          },
          {
            name: "Pets At Home",
            y: 618500
        
          }
          
        ]
      }]

})

    // Radialize the colors
    //code needed be scrutinised, check with Highchart website
    chart.getOptions().colors = Highcharts.map(chart.getOptions().colors, function (color) {
      return { 
        radialGradient: {
          cx: 0.5,
          cy: 0.3,
          r: 0.7
        },
        stops: [
          [0, color],
          [1, Highcharts.Color(color).brighten(-0.3).get('rgb')] // darken
        ]
      };
    })
}

module.exports = PieChart;