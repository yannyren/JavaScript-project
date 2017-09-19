var AjaxRequest = require( './services/ajax_request.js');
var DetailsPage = require( './views/details_page_view');
var OverviewPage = require( './views/overview_page_view');

// var detailsPage = new DetailsPage( app.refresh, detailsPageElement  );
// var overviewPage = new OverviewPage( app.refresh, overviewPageElement );

var App = function(){
    this.detailsPage = new DetailsPage( this.refresh );
    this.overviewPage = new OverviewPage( this.refresh );
}

App.prototype.refresh = function(){
        var requestData = new AjaxRequest( "http://localhost:3001/api/portfolio" );
        requestData.get( function( data ){
            this.detailsPage.setData( data );
            this.overviewPage.setData( data );
            this.detailsPage.render();
            this.overviewPage.render();
        }.bind( this ))
}

App.prototype.start = function(){

        console.log( document );
        console.log( window );

        var overviewPageElement = document.getElementById('overviewpage');
        console.log( "Should be overviewPageElement", overviewPageElement );
        var detailsPageElement = document.getElementById('detailspage');
        console.log( "Should be detailsPageElement", detailsPageElement);

        overviewPageElement.style.display = 'block';
        detailsPageElement.style.display = 'none';

        var overviewbtn = document.getElementById('overviewbtn');
        overviewbtn.addEventListener('click', function() {
            overviewPageElement.style.display = "block";
            detailsPageElement.style.display = "none";
        })

        var detailsbtn = document.getElementById('detailsbtn')
        detailsbtn.addEventListener('click', function() {
            detailsPageElement.style.display = 'block';
            overviewPageElement.style.display = 'none';
        })

        this.refresh();
}


window.addEventListener('load', function(){
    var app = new App();
    app.start();
}); 