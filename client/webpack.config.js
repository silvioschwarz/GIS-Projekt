const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  resolve: {
    fallback: {
        "fs": false,
        "assert": false,
        "util": false,
        "dns": false,
        "url": false,
        "net": false,
        "tls": false,
        "pg-native": false,
        "pg": false,
        "crypto": false,
        "path": false,
        "stream": false,
        "buffer": false,
    },
},
experiments: {
  topLevelAwait: true,
},
  // target:'node',
  output: {
    filename: "[name].pack.js",
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[
    new HtmlWebPackPlugin({
    template: path.resolve( __dirname, 'public/index.html' ),
    filename: 'index.html'
 }),
 // Or, for WebPack 4+:
 new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
 ],
  "module": {
    "rules": [
      {
        "use": {
          "loader": "babel-loader",
          "options": {
            "presets": [
                "@babel/react" , 
                "@babel/env" , 
            ],
            "plugins": [
                "@babel/plugin-proposal-class-properties"
            ]
         }
        },
        "exclude": /node_modules/,
        "test": /\.js$/
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  "entry": {
    "index": "./src/index"
  },
  
};