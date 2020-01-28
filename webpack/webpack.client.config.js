const path = require('path')
const webpack = require('webpack')
const ExtracCssPlugin = require('mini-css-extract-plugin')

const config = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, '../source/client/index.js')],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'client.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/(node_modules)/',
        options: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: '> 0.25%, not dead'
              }
            ],
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: ExtracCssPlugin.loader },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
    alias: {
      hooks: path.resolve(__dirname, '../source/app/hooks'),
      helpers: path.resolve(__dirname, '../source/app/helpers'),
      components: path.resolve(__dirname, '../source/app/components'),
      flux: path.resolve(__dirname, '../source/app/flux')
    }
  },
  plugins: [
    new ExtracCssPlugin({
      filename: 'styles.css'
    }),
    new webpack.DefinePlugin({
      IS_PRODUCTION: process.env.NODE_ENV === 'production' ? true : false,
      URL: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'),
      ASSETS: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:3000/public' : 'http://localhost:3000/public'),
      API: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:3000/api' : 'http://localhost:3000/api'),
    })
  ],
  target: 'web'
}

module.exports = config
