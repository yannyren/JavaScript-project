var SingleLineValuation = function (refresh, container) {
    this.data = null;
    this.refresh = refresh;
    this.container = container
}


SingleLineValuation.prototype.setData = function ( data ){
    this.data = data;
}

SingleLineValuation.prototype.render = function() {
    var stockData = this.data;
    var container = this.container;
    
    while ( container.firstChild ){
        container.removeChild( container.firstChild );
    }

    stockData.forEach(function(stock) {
        var row = document.createElement('tr');

        var stockNameTd = document.createElement('td');
        stockNameTd.innerText = stock.name;
        row.appendChild(stockNameTd);
        var stockEpicTd = document.createElement('td');
        stockEpicTd.innerText = stock.epic;
        row.appendChild(stockEpicTd);
        var stockQuantityTd = document.createElement('td');
        stockQuantityTd.innerText = stock.quantity;
        row.appendChild(stockQuantityTd);
        var stockPriceTd = document.createElement('td');
        stockPriceTd.innerText = stock.price;
        row.appendChild(stockPriceTd);

        var value = document.createElement('td');
        
        var stockValuation = "$"+(stock.quantity * stock.price) / 100;
        stockValuation = stockValuation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        value.innerText = stockValuation;    
        row.appendChild(value); 

        container.appendChild(row);
    });
}

module.exports = SingleLineValuation;