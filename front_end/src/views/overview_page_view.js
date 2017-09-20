var PieChart = require( './portfolioPieChart_view');
var Valuation = require( './valuation_view');
var TotalChart = require( './totalChart_view' ); 

var OverviewPage = function( refresh ) {
    this.data = null;
    this.refresh = refresh;

    //grab dom elements
    pieChartContainer = document.querySelector( '#pieChart' );
    pieChart = new PieChart( this.refresh, pieChartContainer );
    totalValuation = document.querySelector( '#valuation');
    valuation = new Valuation (this.refresh, totalValuation);
    totalChartContainer = document.querySelector( '#total-chart' );
    totalChart = new TotalChart( this.refresh, totalChartContainer );
}

OverviewPage.prototype.render = function(){
    pieChart.setData( this.data );
    pieChart.render();
    valuation.setData( this.data);
    valuation.render();
    totalChart.setData( this.data );
    totalChart.render();
}

OverviewPage.prototype.setData = function( data ){
    this.data = data;
}

module.exports = OverviewPage;