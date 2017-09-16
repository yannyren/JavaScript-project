var PortfolioView = function(){

}

PortfolioView.prototype.render = function(portfolioData){
    console.log("from portfolio.render", portfolioData);
    console.log( "should be document", document );
    console.log( "should be portfolio-list", document.getElementById('portfolio-list') );
    var portfolioList = document.getElementById('portfolio-list');
    console.log( "should be portfolioList", portfolioList); 
    for (var i = 0; i < portfolioData.length; i++) {
        var listItem = document.createElement('li');
        listItem.value = i;
        listItem.innerText = portfolioData[i].name;
        portfolioList.appendChild(listItem);
    }
}

module.exports = PortfolioView;