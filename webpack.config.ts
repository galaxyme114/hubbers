import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as Dotenv from 'dotenv-webpack'
import * as ExtractTextWebpackPlugin from 'extract-text-webpack-plugin'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import * as path from 'path'
import * as webpack from 'webpack'

const config = {
	entry: [
		'react-hot-loader/patch',
		'./src/index.tsx',
		'./assets/styles/main.scss'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css', '.scss', '.json']
	},

	plugins: [
		new Dotenv(),
		new HtmlWebpackPlugin({
			title: 'Hubbers v2',
			chunksSortMode: 'dependency',
			template: path.resolve(__dirname, './src/index.html')
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextWebpackPlugin('main.css'),
		new CopyWebpackPlugin([
			{from: 'assets/images', to: 'images'},
			{from: 'assets/icons', to: 'icons'},
			{from: 'src/_redirects', to: ''}
		]),
		new webpack.ContextReplacementPlugin(
			/moment[/\\]locale$/,
			/eu|cn/
		)
	],

	module: {
		loaders: [
			// Separate all font icons
			{
				test: /\.(png|jp(e*)g|webp|gif)$/,
				loader: 'url-loader?limit=10000'
			},
			{
				test: /\.woff(2)?(\?[a-z0-9]+)?$/,
				loader: 'url-loader?limit=10000&mimetype=application/font-woff'
			},
			{
				test: /\.(ttf|eot|otf|svg)(\?[a-z0-9]+)?$/,
				loader: 'file-loader'
			},
			// Load SASS
			{
				test: /\.(css|scss)/,
				use: ['css-hot-loader', ...ExtractTextWebpackPlugin.extract({
					use: [
						{
							loader: 'css-loader'
						},
						{
							loader: 'sass-loader',
							options: {
								includePaths: [...require('bourbon').includePaths, ...require('bourbon-neat').includePaths]
							}
						}
					]
				})]
			},
			// Load JSON
			{
				test: /\.json$/, loader: 'json-loader'
			},
			// All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
			{
				test: /\.tsx?$/,
				loaders: [
					'react-hot-loader/webpack',
					'awesome-typescript-loader'
				],
				exclude: path.resolve(__dirname, 'node_modules'),
				include: path.resolve(__dirname, 'src')
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: 'pre',
				test: /\.js$/,
				loader: 'source-map-loader'
			}
		]
	},

	devServer: {
		hot: true,
		inline: true,
		historyApiFallback: true
	}

}

export default config
