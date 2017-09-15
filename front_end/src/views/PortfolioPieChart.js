 // Radialize the colors
Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
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
});

//Build the chart
// var PieChart = function(title, data)
var PieChart = function() {
    
    var container = document.getElementById("pieChart");
    
    var chart = new Highcharts.Chart({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        renderTo: container
      },
      title: { 
        text: 'Portfolio Analysis'
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
                epic: "FXI",
                price: 120.00,
                quantity: 2000, 
                y: 240000 //price * quantity
                //different color from the default theme??
                
              },
              {
                name: "Empiric Student Prop",
                epic: "ESP",
                price: 112.00,
                quantity: 3500,
                y: 392000,
                sliced: true
               
              },
              {
                name: "Worldpay",
                epic: "WGP",
                price: 301.00,
                quantity: 1000,
                y: 310000
          
              },
              {
                name: "Pets At Home",
                epic:"PETS",
                price: 247.40,
                quantity: 2500,
                y: 618500
             
              }
              
          ]
           }]

    })
}