const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    filename: "[name].pack.js",
    path: path.resolve(__dirname, 'dist'),
  },
  plugins:[
    new HtmlWebPackPlugin({
    template: path.resolve( __dirname, 'public/index.html' ),
    filename: 'index.html'
 })
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
  }
};