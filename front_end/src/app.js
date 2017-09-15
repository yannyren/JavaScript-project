var AjaxRequest = require('/services/ajax_request.js');
var PortfolioView = require('/views/portfolio_view.js');

function app() {
    var portfolioView = new PortfolioView();
    var seedData = new AjaxRequest("http://localhost:3001/");
    seedData.get(portfolioView.render);
}

window.addEventListener('load', app);