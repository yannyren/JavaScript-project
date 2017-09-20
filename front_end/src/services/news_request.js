var AjaxRequest = require( './ajax_request' );

var NewsRequest = function( refresh, domElement ){
    newsUrl = "http://finance.yahoo.com/rss/headline?s=yhoo";
    this.data = null;
    this.refresh = refresh;
    this.domElement = domElement;
}

NewsRequest.prototype.setData = function( data ){
    this.data = data;
}

NewsRequest.prototype.pullNewsRequest = function(){
    listOfNews = new AjaxRequest ( newsUrl );
}

module.exports = NewsRequest;