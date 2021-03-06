const path = require('path')
const webpack = require('webpack')
const extract = require('mini-css-extract-plugin')

const config = {
  entry: ['regenerator-runtime/runtime', path.resolve(__dirname, '../source/server/index.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'server.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/(node_modules)/',
        options: {
          presets: [
            '@babel/preset-env',
            '@babel/preset-react'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: extract.loader
          },
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
      api_helpers: path.resolve(__dirname, '../source/server/api/helpers'),
      api_modules: path.resolve(__dirname, '../source/server/api/modules'),
      api_models: path.resolve(__dirname, '../source/server/api/models'),
      components: path.resolve(__dirname, '../source/app/components'),
      flux: path.resolve(__dirname, '../source/app/flux')
    }
  },
  plugins: [
    new extract({
      filename: 'styles.css'
    }),
    new webpack.DefinePlugin({
      IS_PRODUCTION: process.env.NODE_ENV === 'production',
      URL: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:3000' : 'http://localhost:3000'),
      ASSETS: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:3000/public' : 'http://localhost:3000/public'),
      API: JSON.stringify(process.env.NODE_ENV === 'production' ? 'http://localhost:3000/api' : 'http://localhost:3000/api'),
    })
  ],
  target: 'node'
}

module.exports = config
