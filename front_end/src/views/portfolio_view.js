var PortfolioView = function( refresh, domElement ){
    this.data = null;
    this.refresh = refresh;
    this.domElement = domElement;
}

PortfolioView.prototype.render = function(){
    var portfolioData = this.data;
    console.log( "should be portfolioData", portfolioData); 
    for (var i = 0; i < portfolioData.length; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.innerText = portfolioData[i].name;
        this.domElement.appendChild(option);
    }
}

PortfolioView.prototype.setData = function( data ){
    this.data = data;
}

module.exports = PortfolioView;