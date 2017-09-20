var AjaxRequest = function(url) {
    this.url = url;
    this.data = [];
}

AjaxRequest.prototype.get = function(callback) {
    var request = new XMLHttpRequest();
    request.open('GET', this.url);
    // console.log( "this.url", this.url );
    request.addEventListener('load', function() {
        if (request.status !== 200) return;
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
        console.log( 'From ajaxrequest', this.data );
        callback(this.data);
    }.bind(this));
    request.send();
}

AjaxRequest.prototype.post = function(sendData, callback) {
    var request = new XMLHttpRequest();
    request.open("POST", this.url);
    console.log( "this.url", this.url );
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener('load', function() {
        if (request.status!==200) return;
        var jsonString = request.responseText;
        this.data = JSON.parse(jsonString);
        callback( this.data );
    }.bind(this));
    request.send(JSON.stringify(sendData));
}

module.exports = AjaxRequest;