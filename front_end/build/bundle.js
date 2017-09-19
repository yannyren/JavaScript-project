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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var AjaxRequest = __webpack_require__( 3);
var DetailsPage = __webpack_require__( 7);
var OverviewPage = __webpack_require__( 8);

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
/* 1 */
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
}

PortfolioView.prototype.setData = function( data ){
    this.data = data;
}

module.exports = PortfolioView;

/***/ }),
/* 2 */
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
/* 3 */
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
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var PortfolioView = __webpack_require__(1);
var ScatterChart = __webpack_require__(6);
var AjaxRequest = __webpack_require__( 3 );

var DetailsPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    portfolioViewSelect = document.querySelector('#portfolio-list')
    portfolioView = new PortfolioView( this.refresh, portfolioViewSelect );
    scatterChartContainer = document.querySelector( '#scatterChart')
    scatterChart = new ScatterChart( this.refresh, scatterChartContainer );


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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var PieChart = __webpack_require__( 2);
var Valuation = __webpack_require__( 12);

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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map