var AjaxRequest = require('/services/ajax_request.js');
var PortfolioView = require('/views/portfolio_view.js');
var PieChart = require('/views/portfolioPieChart_view.js')

function app() {
    var portfolioView = new PortfolioView();
    var seedData = new AjaxRequest("http://localhost:3001/");
    seedData.get(portfolioView.render);

<<<<<<< HEAD

    var overviewbtn = document.getElementById('overviewbtn');
    overviewbtn.addEventListener('click', function() {

    })

    var detailsbtn = document.getElementById('detailsbtn');
    detailsbtn.addEventListener('click', function() {
        
    })
=======
    var portfolioPieChart = new PieChart();
    seedData.get(PieChart.render);
>>>>>>> 0db20494e823d4e8a9707e509855bf42235c0bb4
}

window.addEventListener('load', app);