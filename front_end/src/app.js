var AjaxRequest = require('/services/ajax_request.js');
var PortfolioView = require('/views/portfolio_view.js');
var PieChart = require('/views/portfolioPieChart_view.js')

function app() {
    var portfolioView = new PortfolioView();
    var seedData = new AjaxRequest("http://localhost:3001/");
    seedData.get(portfolioView.render);

    var portfolioPieChart = new PieChart();
    seedData.get(PieChart.render);
}

window.addEventListener('load', app);