var portfolioView = new PortfolioView();
var seedData = new AjaxRequest("http://localhost:3001/");
seedData.get(portfolioView.render);

var overviewbtn = document.getElementById('overviewbtn');
overviewbtn.addEventListener('click', function() {

})

var detailsbtn = document.getElementById('detailsbtn')

detailsbtn.addEventListener('click', function() {

})


}

window.addEventListener('load', app); 