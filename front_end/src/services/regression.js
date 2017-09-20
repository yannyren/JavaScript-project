var lsqLinearFit = function( data ){
  //data = [ [x1,y1], [x2,y2],... , [xn,yn] ]

  var meanX = getMeanX( data );
  var meanY = getMeanY( data );
  var gradient = getGradient( data, meanX, meanY );
  var intercept = getIntercept( meanX, meanY, gradient );
  return [ gradient, intercept ];

}

var getMeanX = function( data ){
  var meanX = 0.0;
  for ( var i = 0; i < data.length; i++ ){
    meanX += data[i][0];
  }
  return 1.0 * meanX / ( data.length );
}

var getMeanY = function( data ){
  var meanY = 0.0;
  for ( var i = 0; i < data.length; i++ ){
    meanY += data[i][1];
  }
  return 1.0 * meanY / ( data.length );
}

var getGradient = function( data, meanX, meanY ){
  var numerator = 0.0;
  var denominator = 0.0;
  for ( var i = 0; i < data.length; i++ ){
    var x = data[i][0];
    var y = data[i][1];
    numerator += ( x - meanX ) * ( y - meanY );
    denominator += ( x - meanX ) * ( x - meanX );
  }
  return 1.0 * numerator / denominator;
}

var getIntercept = function( meanX, meanY, gradient ){
  return meanY - gradient * meanX;
}

module.exports = lsqLinearFit;