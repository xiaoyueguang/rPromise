var single = true
var testFiles = single ? '../test/test.js' : '../test/**/*.test.js'
var webpackConfig = {
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: '#inline-source-map'
}

// shared config for all unit tests
module.exports = {
  basePath: '',
  frameworks: ['mocha'],
  files: [
    testFiles
  ],
  preprocessors: {
    [testFiles]: ['webpack', 'sourcemap']
  },
  webpack: webpackConfig,
  webpackMiddleware: {
    noInfo: true
  },
  plugins: [
    'karma-mocha',
    'karma-mocha-reporter',
    'karma-sourcemap-loader',
    'karma-webpack'
  ]
}