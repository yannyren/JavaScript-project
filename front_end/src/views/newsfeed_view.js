var NewsFeedView = function( refresh ){
    this.data = null;
    this.refresh = refresh;
}

NewsFeedView.prototype.render = function(newsData){
    var newsFeed = document.querySelector('#news-feed');
        for (var i = 0; i < array.length; i++) {
            var newsItem = document.createElement('article');
            newsItem.value = i;
            newsItem.innerText = twitterData[i];
            newsFeed.appendChild(newsItem);     
        }
}

module.exports = NewsFeedView;