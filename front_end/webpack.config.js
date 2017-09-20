config = {
    entry: __dirname + "/src/app.js",
    output: {
      filename: "bundle.js",
      path: __dirname + "/build"
    },
    module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
    devtool: 'source-map'
  }
  
module.exports = config;
