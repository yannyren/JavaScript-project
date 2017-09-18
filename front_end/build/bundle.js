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

var PortfolioView = __webpack_require__(1);
var PieChart = __webpack_require__( 2);
var AjaxRequest = __webpack_require__( 3);
var FunctionBlock = __webpack_require__(5);
portfolioView = new PortfolioView();
pieChart = new PieChart();

var afterAjax = new FunctionBlock();
afterAjax.addFunction(pieChart.render);
afterAjax.addFunction(portfolioView.render);

var seedData = new AjaxRequest("http://localhost:3001/api/portfolio");
seedData.get(afterAjax);


var app = function(){
    
    var openingPage = function(){
        var overviewPage = document.getElementById('overviewpage'); 
        overviewPage.style.display = 'block';
        var detailsPage = document.getElementById('detailspage');
        detailsPage.style.display = 'none';
    }
    openingPage();

    var overviewbtn = document.getElementById('overviewbtn');
    overviewbtn.addEventListener('click', function() {
        var overviewPage = document.getElementById('overviewpage');
        overviewPage.style.display = "block";
        var detailsPage = document.getElementById('detailspage');
        detailsPage.style.display = "none";
    })

    var detailsbtn = document.getElementById('detailsbtn')
    detailsbtn.addEventListener('click', function() {
        var detailsPage = document.getElementById('detailspage');
        detailsPage.style.display = 'block';
        var overviewPage = document.getElementById('overviewpage');
        overviewPage.style.display = 'none';
    })

}

window.addEventListener('load', app); 

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var PortfolioView = function(){

}

PortfolioView.prototype.render = function(portfolioData){
    console.log( "should be portfolioData", portfolioData); 
    var portfolioList = document.getElementById('portfolio-list');
    for (var i = 0; i < portfolioData.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = portfolioData[i].name;
        portfolioList.appendChild(option);
    }
}

module.exports = PortfolioView;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var PieChart = function() {

}

PieChart.prototype.render = function(stockData) {
  
  var container = document.getElementById("pieChart");
    
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
        renderTo: container
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
    request.addEventListener('load', function() {
        if (request.status !== 200) return;
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
        console.log( 'From ajaxrequest', this.data );
        callback.setData(this.data);
        callback.execute();
    }.bind(this));
    request.send();
}

AjaxRequest.prototype.post = function(data) {
    var request = new XMLHttpRequest();
    request.open("POST", this.url);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener('load', function() {
        if (request.status!==200) return;
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
    }.bind(this));
request.send(JSON.stringify(data));
}

module.exports = AjaxRequest;

/***/ }),
/* 4 */,
/* 5 */
/***/ (function(module, exports) {

var FunctionBlock = function(){
  this.data = null;
  this.functions = [];
}
FunctionBlock.prototype.setData = function( data ){
  this.data = data;
}
FunctionBlock.prototype.addFunction = function( addFunction ){
  this.functions.push( addFunction );
}
FunctionBlock.prototype.execute = function(){
  for ( var runFunction of this.functions ){
    runFunction( this.data );
  }
}

module.exports = FunctionBlock;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map