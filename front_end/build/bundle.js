/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var AjaxRequest = function(url) {
    this.url = url;
    this.data = [];
}

AjaxRequest.prototype.get = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    console.log( "this.url", this.url );
    request.addEventListener('load', function() {
        if (request.status !== 200) return;
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
        console.log( 'From ajaxrequest', this.data );
        callback(this.data);
    }.bind(this));
    request.send();
}

AjaxRequest.prototype.post = function(sendData, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", this.url);
    console.log( "this.url", this.url );
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener('load', function() {
        if (request.status!==200) return;
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
        callback( this.data );
    }.bind(this));
    request.send(JSON.stringify(sendData));
}

module.exports = AjaxRequest;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__( 0);
var DetailsPage = __webpack_require__( 2);
var OverviewPage = __webpack_require__( 5);

// var detailsPage = new DetailsPage( app.refresh, detailsPageElement  );
// var overviewPage = new OverviewPage( app.refresh, overviewPageElement );

var App = function(){
    this.detailsPage = new DetailsPage( this.refresh.bind(this) );
    this.overviewPage = new OverviewPage( this.refresh.bind(this) );
}

App.prototype.refresh = function(){
        var requestData = new AjaxRequest( "http://localhost:3001/api/portfolio" );
        requestData.get( function( data ){
            this.detailsPage.setData( data );
            this.overviewPage.setData( data );
            this.detailsPage.render();
            this.overviewPage.render();
        }.bind(this))
}

App.prototype.start = function(){

        var overviewPageElement = document.getElementById('overviewpage');
        var detailsPageElement = document.getElementById('detailspage');

        overviewPageElement.style.display = 'block';
        detailsPageElement.style.display = 'none';

        var overviewbtn = document.getElementById('overviewbtn');
        overviewbtn.addEventListener('click', function() {
            overviewPageElement.style.display = "block";
            detailsPageElement.style.display = "none";
        })

        var detailsbtn = document.getElementById('detailsbtn')
        detailsbtn.addEventListener('click', function() {
            detailsPageElement.style.display = 'block';
            overviewPageElement.style.display = 'none';
        })

        this.refresh();
}


window.addEventListener('load', function(){
    var app = new App();
    app.start();
}); 

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var PortfolioView = __webpack_require__(3);
var ScatterChart = __webpack_require__(4);
var AjaxRequest = __webpack_require__( 0 );

var DetailsPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    portfolioViewSelect = document.querySelector('#portfolio-list')
    portfolioView = new PortfolioView( this.refresh, portfolioViewSelect );
    scatterChartContainer = document.querySelector( '#scatterChart')
    scatterChart = new ScatterChart( this.refresh, scatterChartContainer );

    portfolioViewSelect.addEventListener( "change", function( event ){
        scatterChart.setSeries( event.target.value );
        scatterChart.render();
    })

    var addShareButton = document.querySelector( "#add-share" );
    addShareButton.addEventListener( "click", this.addShares.bind(this) );

}

DetailsPage.prototype.render = function(){
    portfolioView.setData( this.data );
    scatterChart.setData( this.data );
    portfolioView.render();
    scatterChart.render();
}

DetailsPage.prototype.setData = function( data ){
    this.data = data;
}

DetailsPage.prototype.addShares = function(){
    var newName = document.querySelector( "#new-name" );
    var newEpicText = document.querySelector( "#new-epic" );
    var newNumber = document.querySelector( "#new-number" );
    var newBuyPrice = document.querySelector( "#new-buy-price" );
    var newShare = {
        "name": newName.value,
        "epic": newEpicText.value,
        "price": newBuyPrice.value,
        "quantity": newNumber.value,
        "buyPrice": newBuyPrice.value,
        "buyDate": new Date().toISOString().split('T')[0]
    }
    console.log( newShare );
    var postShare = new AjaxRequest( "http://localhost:3001/api/portfolio" );
    console.log( "this.refresh in addShares", this );
    postShare.post( newShare, this.refresh );

}

module.exports = DetailsPage;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var PortfolioView = function( refresh, domElement ){
    this.data = null;
    this.refresh = refresh;
    this.domElement = domElement;
}

PortfolioView.prototype.render = function(){
    var portfolioData = this.data;
    console.log( "should be portfolioData", portfolioData); 

    while( this.domElement.firstChild ) {
        this.domElement.removeChild( this.domElement.firstChild );
    }

    for (var i = 0; i < portfolioData.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = portfolioData[i].name;
        this.domElement.appendChild(option);
    }

    this.domElement.firstChild.selected = "true";
}

PortfolioView.prototype.setData = function( data ){
    this.data = data;
}

module.exports = PortfolioView;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var lsqLinear = __webpack_require__( 8 );

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
    //    layout: 'vertical',
    //    align: 'left',
    //    verticalAlign: 'top',
    //    x: 50,
    //    y: 300,
    //    floating: true,
    //    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
    //    borderWidth: 0
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
               pointFormat: '{point.x} day, {point.y} cents'
           }
       }
   },
   series: scatterObjects
});

}

module.exports = ScatterChart;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var PieChart = __webpack_require__( 6);
var Valuation = __webpack_require__( 7);

var OverviewPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    pieChartContainer = document.querySelector( '#pieChart' );
    pieChart = new PieChart( this.refresh, pieChartContainer );
    totalValuation = document.querySelector( '#valuation');
    valuation = new Valuation (this.refresh, totalValuation);
}

OverviewPage.prototype.render = function(){
    pieChart.setData( this.data );
    pieChart.render();
    valuation.setData( this.data);
    valuation.render();
}

OverviewPage.prototype.setData = function( data ){
    this.data = data;
}

module.exports = OverviewPage;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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
      marginTop: 90,
      spacingTop: 50,
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

  Highcharts.getOptions().colors = Highcharts.map(Highcharts.getOptions().colors, function (color) {
    return {
      radialGradient:
      {
        cx: 0.5,
        cy: 0.3,
        r: 0.9,
      },
      stops: [
        [0, color],
        [1, Highcharts.Color(color).brighten(-0.3).get('rgb')]
      ]
    }
  });
}

module.exports = PieChart;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var Valuation = function (refresh, container) {
    this.data = null;
    this.refresh = refresh;
    this.container = container
}

Valuation.prototype.setData = function ( data ){
    this.data = data;
}

Valuation.prototype.render = function() {
    var totalValuation = 0;
    var stockData = this.data;
    
    stockData.forEach(function(stock) {
        totalValuation += (stock.quantity * stock.price);
    });

    totalValuation = totalValuation/100;
    
    totalValuation = totalValuation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    this.container.innerText = "Total Valuation: $" + (totalValuation); 
}

module.exports = Valuation;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var lsqLinearFit = function( data ){
  //data = [ [x1,y1], [x2,y2],... , [xn,yn] ]

  var meanX = getMeanX( data );
  var meanY = getMeanY( data );
  var gradient = getGradient( data, meanX, meanY );
  var intercept = getIntercept( meanX, meanY, gradient );
  return [ gradient, intercept ];

}

var getMeanX = function( data ){
  var meanX = 0.0;
  for ( var i = 0; i < data.length; i++ ){
    meanX += data[i][0];
  }
  return 1.0 * meanX / ( data.length );
}

var getMeanY = function( data ){
  var meanY = 0.0;
  for ( var i = 0; i < data.length; i++ ){
    meanY += data[i][1];
  }
  return 1.0 * meanY / ( data.length );
}

var getGradient = function( data, meanX, meanY ){
  var numerator = 0.0;
  var denominator = 0.0;
  for ( var i = 0; i < data.length; i++ ){
    var x = data[i][0];
    var y = data[i][1];
    numerator += ( x - meanX ) * ( y - meanY );
    denominator += ( x - meanX ) * ( x - meanX );
  }
  return 1.0 * numerator / denominator;
}

var getIntercept = function( meanX, meanY, gradient ){
  return meanY - gradient * meanX;
}

module.exports = lsqLinearFit;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map