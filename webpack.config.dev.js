var webpack = require("webpack");
var path = require("path");

module.exports = {
  debug: true,
  devtool: 'inline-source-map',
  noInfo : false,
  entry: [
    path.resolve(__dirname, 'src/bootstrap')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [],
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },
  module: {
    preLoaders: [
      {
          test: /\.ts$/,
          loader: 'tslint-loader'
      }
    ],
    loaders: [
      { test: /\.ts$/, exclude: /node_modules/, loader: 'ts-loader' },
      { test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  tslint: {
    configuration: {
      rules: {
          quotemark: [true, 'double'],
          noconsole : true
      }
    },
    emitErrors: true
  }
}
