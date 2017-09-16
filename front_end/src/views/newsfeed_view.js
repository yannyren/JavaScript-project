var NewsFeedView = function(){

}

NewsFeedView.prototype.render = function(twitterData){
    var newsFeed = document.querySelector('#news-feed');
        for (var i = 0; i < array.length; i++) {
            
            // check how an 'article' looks in the view. Might need to insert multiple elements 
            // for header, link to story, etc. 

            var newsItem = document.createElement('article');
            newsItem.value = i;
            newsItem.innerText = twitterData[i];
            newsFeed.appendChild(newsItem);     
        }
}

module.exports = NewsFeedView;