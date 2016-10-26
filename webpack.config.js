var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    client: './src/client/init.js',
    login: './src/views/pages/login/main.js',
    search: './src/views/pages/news/search/main.js',
    quiz: './src/views/pages/quiz/main.js',
    quizSuccess: './src/views/pages/quiz/success/main.js',
    newsList: './src/views/pages/news/newsList.js',
    newsIndex: './src/views/pages/news/index.js',
    articleMedia: './src/views/pages/news/articleMedia.js',
    article: './src/views/pages/news/article.js',
    complain: './src/views/pages/news/complain.js',
    surveyForm: './src/views/pages/intent/surveyForm.js'
  },
  output: {
    path: path.resolve(__dirname, './dist/static/js'),
    publicPath: '/dist/',
    filename: 'build.[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.es6.js', '.vue']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  externals: {
    'vue': 'Vue'
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new webpack.optimize.OccurenceOrderPlugin()
  ])
}
