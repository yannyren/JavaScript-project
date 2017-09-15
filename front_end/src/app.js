var AjaxRequest = require('/services/ajax_request.js');
var PortfolioView = require('/views/portfolio_view.js');

function app() {
    var portfolioView = new PortfolioView();
}

window.addEventListener('load', app);