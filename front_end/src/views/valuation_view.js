var Valuation = function (refresh, container) {
    this.data = null;
    this.refresh = refresh;
    this.container = container
}

Valuation.prototype.setData = function ( data ){
    this.data = data;
}

Valuation.prototype.render = function() {
    var totalValuation = 0;
    var stockData = this.data;
    
    stockData.forEach(function(stock) {
        totalValuation += (stock.quantity * stock.price);
    });

    totalValuation = totalValuation/100;
    
    totalValuation = totalValuation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    this.container.innerText = "Total Valuation: $" + (totalValuation); 
}

module.exports = Valuation;