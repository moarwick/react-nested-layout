var path              = require( 'path' );
var webpack           = require( 'webpack' );
var merge             = require( 'webpack-merge' );
var HtmlWebpackPlugin = require( 'html-webpack-plugin' );
var autoprefixer      = require( 'autoprefixer' );
var ExtractTextPlugin = require( 'extract-text-webpack-plugin' );
var CopyWebpackPlugin = require( 'copy-webpack-plugin' );

var TARGET_ENV        = process.env.npm_lifecycle_event === 'build' ? 'production' : 'development';

// common Webpack config settings
var commonConfig = {
  resolve: {
    extensions: [ '', '.js' ]
  },

  output: {
    path:       path.resolve( __dirname, 'public/' ),
    filename:   '[hash].min.js'
  },

  module: {
    loaders: [
      {
        test:    /\.js$/,
        loaders: [ 'babel' ],
        include: path.resolve( __dirname, 'src' )
      },
      {
        test:    /\.json?$/,
        exclude: /node_modules/,
        loader:  'json'
      },
      {
        test:    /\.(png|jpg|jpeg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'    // inline if under 8k
      },
      {
        test:    /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=2048&name=./fonts/[hash].[ext]'  // inline if under 2k
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject:   'body',
      filename: 'index.html'
    })
  ],

  postcss: [ autoprefixer( { browsers: ['last 2 versions'] } ) ]
};

// additional Webpack settings when running locally ('npm start')
if ( TARGET_ENV === 'development' ) {
  console.log( 'Serving locally...');

  module.exports = merge( commonConfig, {

    // source maps (better than 'eval' but slower)
    devtool: '#eval-source-map',

    // dev server settings
    devServer: {
      historyApiFallback: true,
      hot:                true,
      inline:             true,
      progress:           true
    },

    // dev server with hot-loader
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/index'
    ],

    // for Enzyme testing (needed?)
    externals: {
      'cheerio': 'window',
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': true,
    },

    module: {
      loaders: [
        {
          // compile & auto-prefix CSS
          test: /\.(css|scss)$/,
          loaders: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

// additional Webpack settings when bundling for prod ('npm run build')
if ( TARGET_ENV === 'production' ) {
  console.log( 'Building for prod...');

  module.exports = merge( commonConfig, {

    entry: [
      path.join( __dirname, 'src/index.js' )
    ],

    module: {
      loaders: [
        {
          // create and save out a CSS bundle (using ExtractTextPlugin)
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract( 'style-loader', [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ])
        }
      ]
    },

    plugins: [
      new CopyWebpackPlugin([
        {
          from: 'src/fonts/',
          to:   'fonts/'
        }
      ]),

      // set global vars
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify( 'production' )
      }),

      // optimizations
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),

      // save out CSS bundle (backtrack out of scripts/ to save into css/)
      new ExtractTextPlugin( 'css/[hash].min.css', { allChunks: true } ),

      // minify & mangle JS/CSS
      new webpack.optimize.UglifyJsPlugin({
        minimize:   true,
        compressor: { warnings: false }
        // mangle:  { except:   [ '$super', '$', 'exports', 'require' ] }
      })
    ]
  });
}
