const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/react'],
          plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/transform-async-to-generator',
          ],
        },
      },
      {
        test: /css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },

  plugins: [new HTMLWebpackPlugin({ template: './client/index.html' })],

  devServer: {
    host: 'localhost',
    port: 8080,
    hot: true,
    open: true,
    compress: true,

    webSocketServer: 'ws',

    historyApiFallback: true,

    static: {
      directory: path.join(__dirname, 'build'),
      publicPath: '/',
    },

    headers: { 'Access-Control-Allow-Origin': '*' },

    proxy: {
      '/api/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
      '/assets/**': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
    watchFiles: ['client'],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
