var PortfolioView = function(){

}

PortfolioView.prototype.render = function(portfolioData){
    var portfolioList = document.querySelector('#portfolio-list'); 
    for (var i = 0; i < portfolioData.length; i++) {
        var listItem = document.createElement('li');
        listItem.value = i;
        listItem.innerText = portfolioData[i].name;
        portfolioList.appendChild(listItem);
    }
}

module.exports = PortfolioView;