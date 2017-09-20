var AjaxRequest = require( '../services/ajax_request.js' );
var request = require('request');
var googleFinance = require('google-finance');
var util = require('util');
var _ = require('lodash');


var NewsFeedView = function( refresh, domElement ){
    this.series = 0;
    this.data = null;
    this.refresh = refresh;
    this.domElement = domElement;
}   

NewsFeedView.prototype.setSeries = function( series ){
    this.series = series;
}

NewsFeedView.prototype.setData = function( data ){
    this.data = data;
}


// sometimes needs to refresh twice to get a handle on changes, callback issue?
NewsFeedView.prototype.getNewsData = function(){
    var symbolSuffix = this.data[this.series].epic
    var symbolPrefix = "NASDAQ:"
    var SYMBOL = symbolPrefix + symbolSuffix;
    googleFinance.companyNews( {symbol: SYMBOL}, function (err, news) {
    if (err) { throw err; }
    if (news[0]) {
        this.render( news );
    } 
    }.bind( this ));
}



NewsFeedView.prototype.render = function( newsData ){
   
    console.log("News Data", newsData);   
    //erase anything in domElement already
    while( this.domElement.firstChild ) {
        this.domElement.removeChild( this.domElement.firstChild );
    }
    // //append list items from newsData to this.domElement
    for (var i = 0; i < newsData.length; i++) {
        // var articleContainer = document.createElement('li');
        var articleBody = document.createElement('article');
        articleBody.setAttribute("id", "article-body");
        var date = document.createElement('p');
        var summary = document.createElement('p');
        var link = document.createElement('p');
        // date.innerText = newsData[i].date;
        summary.innerText = newsData[i].summary;
        link.innerText = newsData[i].link;
        
        // articleBody.appendChild(date);
        articleBody.appendChild(summary);
        articleBody.appendChild(link);
        // articleContainer.appendChild(articleBody);
        console.log("this.domElement: ", this.domElement);
        this.domElement.appendChild(articleBody);
    }
}

module.exports = NewsFeedView;