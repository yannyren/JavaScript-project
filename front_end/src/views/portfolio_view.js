var PortfolioView = function(){

}

PortfolioView.prototype.render = function(portfolioData){
    console.log( "should be portfolioData", portfolioData); 
    var portfolioList = document.getElementById('portfolio-list');
    for (var i = 0; i < portfolioData.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = portfolioData[i].name;
        portfolioList.appendChild(option);
    }
}

module.exports = PortfolioView;