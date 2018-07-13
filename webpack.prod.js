const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  output: {
    filename: 'bundle-[hash].js',
    path: path.resolve(__dirname, 'public'),
  },
  devtool: 'source map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
  ],
  mode: 'production',
};
