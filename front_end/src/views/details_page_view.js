var PortfolioView = require('./portfolio_view');
// var ScatterChart = require('./scatterChart_view');

var DetailsPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    portfolioViewSelect = document.querySelector('#portfolio-list')
    portfolioView = new PortfolioView( this.refresh, portfolioViewSelect );
    // scatterChartContainer = document.querySelector( '#scatterChart')
    // scatterChart = new ScatterChart( this.refresh, scatterChartContainer );
}

DetailsPage.prototype.render = function(){
    portfolioView.setData( this.data );
    // scatterChart.setData( this.data );
    portfolioView.render();
    // scatterChart.render();
}

DetailsPage.prototype.setData = function( data ){
    this.data = data;
}

module.exports = DetailsPage;