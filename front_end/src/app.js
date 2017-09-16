var AjaxRequest = require('/services/ajax_request.js');
var PortfolioView = require('/views/portfolio_view.js');
var PieChart = require('/views/portfolioPieChart_view.js')
var NewsFeedView = require('/views/portfolio_view.js');

function app() {
    var portfolioView = new PortfolioView();
    var seedData = new AjaxRequest("http://localhost:3001/");
    seedData.get(portfolioView.render);

    var portfolioPieChart = new PieChart();
    seedData.get(PieChart.render);

    // docs are quite the saga to go through...
    // var newsFeedView = new NewsFeedView();
    // var newsItems = new AjaxRequest( link to the Twitter API here );
    // newsItems.get(newsFeedView.render);
}

window.addEventListener('load', app);