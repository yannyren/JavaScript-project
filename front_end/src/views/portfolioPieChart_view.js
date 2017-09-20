var PieChart = function (refresh, container) {
  this.data = null;
  this.refresh = refresh;
  this.container = container;
}

PieChart.prototype.setData = function (data) {
  this.data = data;
}

PieChart.prototype.render = function () {

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
      type: 'pie',
      options3d: {
        enabled: true,
        alpha: 45
      },
      marginTop: 70,
      spacingTop: 15,
      style: {
        fontFamily: 'Dosis, sans-serif'
      },
      renderTo: this.container
    },
    title:
    {
      text: 'Portfolio Summary',
      style: { "fill": "#434348", "font-weight": "bold", "letter-spacing": "0.3em", "font-size": "34px" },
      margin: 10
    },
    legend: {
      itemStyle: {
         fontWeight: 'bold',
         fontSize: '13px'
      }
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
        innerSize: 150,
        depth: 45,
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          style: { "font-size": "38px" },
          connectorPadding: 5,
          connectorWidth: 3,
          enabled: true,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %',
          connectorColor: 'silver',
          softConnector: false
        }
      }
    },
    series: [
      {
        name: 'Shares',
        data: pieChartObjects
      }]
  });

  // Naughty code, do not activate!!
  // Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
  //   return {
  //     radialGradient:
  //     {
  //       cx: 0.5,
  //       cy: 0.3,
  //       r: 0.9,
  //     },
  //     stops: [
  //       [0, color],
  //       [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
  //     ]
  //   }
  // });
}

module.exports = PieChart;