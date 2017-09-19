var FunctionBlock = function(){
  this.data = null;
  this.functions = [];
}
FunctionBlock.prototype.setData = function( data ){
  this.data = data;
}
FunctionBlock.prototype.addFunction = function( addFunction ){
  this.functions.push( addFunction );
}
FunctionBlock.prototype.execute = function(){
  for ( var runFunction of this.functions ){
    runFunction( this.data );
  }
}

module.exports = FunctionBlock;