var webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
},  {
		test: /\.css$/, loader: "style-loader!css-loader"
	}, {
		test: /\.s?css$/,
		loaders: ["style-loader", "css-loader", "sass-loader"],
		include: path.join(__dirname, "server")
	}, {
		test: /\.(png|gif|jpe?g|svg|jpg)$/,
    	loaders: "url-loader",
			include: path.join(__dirname, "server")
  }, {
    test: /\.svg$/,
    loader: "babel-loader!react-svg-loader",
		include: path.join(__dirname, "server")
  }]
},
devtool: "#cheap-module-inline-source-map"
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]
};
