var PortfolioView = require('./views/portfolio_view');
var PieChart = require( './views/portfolioPieChart_view');
var AjaxRequest = require( './services/ajax_request.js');
portfolioView = new PortfolioView();
pieChart = new PieChart();

var seedData = new AjaxRequest("http://localhost:3001/api/portfolio");
seedData.get(portfolioView.render);


var app = function(){
    
    var openingPage = function(){
        var overviewPage = document.getElementById('overviewpage'); 
        overviewPage.style.display = 'block';
        var detailsPage = document.getElementById('detailspage');
        detailsPage.style.display = 'none';
    }
    openingPage();
    
    pieChart.render();

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