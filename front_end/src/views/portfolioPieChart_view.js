var PieChart = function( refresh, container ) {
  this.data = null;
  this.refresh = refresh;
  this.container = container;
  console.log( "PieChartContainer =", this.container );
}

PieChart.prototype.setData = function( data ){
  this.data = data;
}

PieChart.prototype.render = function() {
  
    var stockData = this.data;

    var pieChartObjects = [];

    for (var i = 0; i < stockData.length; i++) {
      var obj = {};
      obj["name"] = stockData[i].name;
      obj["y"] = (stockData[i].price * stockData[i].quantity * 1.0);
      pieChartObjects.push(obj);
    }

    var chart = new Highcharts.Chart({

      chart:
      {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: this.container
      },
      title: 
      { 
        text: 'Portfolio Summary'
      },
      credits: 
      {
        enabled: false
      },
      tooltip: 
      {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: 
      {
        pie: 
        {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          style: 
          {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          },
          connectorColor: 'silver'
          }
        }
      },
      series: [
        {
        name: 'Shares',
        data: pieChartObjects
        
      }]
});

Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
  return {
    radialGradient:
    {
      cx: 0.5,
      cy: 0.3,
      r: 0.7,
    },
    stops: [
      [0, color],
      [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
    ]
  }
});}

module.exports = PieChart;