var PortfolioView = require('./views/portfolio_view');
var PieChart = require( './views/portfolioPieChart_view');
var AjaxRequest = require( './services/ajax_request.js');
var FunctionBlock = require('./models/function_block');
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