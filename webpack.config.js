const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const DIST = 'dist';
// const DIST_FOLDER = `${DIST}/`;
// set by dockerfile npm run ARG SRV_ENV=localhost ENV SRV_ENV ${SRV_ENV}
const SRV_ENV = process.env.SRV_ENV;
const NODE_ENV = process.env.NODE_ENV;
const DEBUG = NODE_ENV !== 'production';

const VENDOR_LIBS = [
  'lodash',
  'react',
  'react-dom',
  'react-redux',
  'react-router',
  'redux',
//   "redux-thunk"
  // from package.json
];

module.exports = {
  devtool: DEBUG ? 'cheap-eval-source-map' : null, // for better trace error code https://reactjs.org/docs/cross-origin-errors.html
  entry: {
    bundle: ['babel-polyfill', './src/index.jsx'],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: path.resolve(__dirname, DIST),
    filename: '[name].[hash].js',
    // publicPath: 'assets/', // for url-loader image append 'output.publicPath'
    // no need publicPath anymore when using HtmlWebpackPlugin
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // '//' for regex; \. for .  ? for 0 or 1; $ for end
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
      {
        test: /\.s?css$/, // http://sass-lang.com/guide
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|eot|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 40000,
            },
          },
          'img-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json'], // here for impoer filename no need to append .js .jsx just filename so have to have '*'
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'], // duplicate the pull out to vendor
      // manifest for sure the vendor file is changed instead if pull out from bundle.js misunderstanding
    }),
    new HtmlWebpackPlugin({ // add <scripts> for us auto
      template: 'src/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV),
        SRV_ENV: JSON.stringify(SRV_ENV),
      },
      // 'process.env.NODE_ENV' will be a global variable access from everywhere
      // process.env    NODE_ENV is pass by package.json script
    }),
  ].concat(DEBUG ? [
    // Development
    new webpack.ProgressPlugin((percentage, msg) => {
      process.stdout.clearLine(1);
      process.stdout.write(`${msg} [${(percentage * 100).toFixed(1)}%]`);
      process.stdout.cursorTo(0);
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ] : [
    // Production
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        drop_console: true,
      },
    }),
  ]),
  devServer: {
    historyApiFallback: true, // make route works; cause the dev server is running the project
    contentBase: path.join(__dirname, DIST),
    compress: true,
    port: 9001,
    // hot: true, // add this will makes css not live reload
  },
};


/*
Problem:
using react router refresh
all path works well, but when with params like path="/catalog/:id"
then refresh the browser, get failed
//console log   'net::ERR_ABORTED ' 404 error when refreshing page

the problem is caused by
<script type="text/javascript" src="manifest.4921a6cd1254bc2f1cd8.js">
shoudl be
<script type="text/javascript" src="/manifest.4921a6cd1254bc2f1cd8.js">
*/

/*
path.resolve like 'cd' with the previous
path.join concatenate the previous argument
*/
