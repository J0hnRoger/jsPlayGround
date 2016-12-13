import path from "path";
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import WebpackMd5Hasg from 'webpack-md5-hash'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  debug: true,
  devtool: 'source-map',
  noInfo : false,
  entry: {
    main: path.resolve(__dirname, 'src/index'),
    vendor: path.resolve(__dirname, 'src/vendor')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js' //placeholder for use the name of the entry points
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src')
  },
  plugins: [
    //Generate external css file ith a hash in the filename
    new ExtractTextPlugin('[name].[chunkhash].css'),
    // Hash the files unsing MD5 so that their names change when the content change
    new WebpackMd5Hasg(),
    // Use CommonsChunkPlugin to create a separate bundle
    // of vendor libraries so that they 're cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    new HtmlWebpackPlugin ({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    //Eliminate duplicate packages when generating bundle
    new webpack.optimize.DedupePlugin(),
    // Minify JS
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
    ]
  }
}
