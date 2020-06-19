var webpack = require('webpack')

require('dotenv').config()

module.exports = {
	publicPath: process.env.NODE_ENV == 'development' ? '/' : '/',
	devServer: {
		// proxy: process.env.VUE_APP_API_URL,
		proxy: {
      '/cep': {
        target: process.env.VUE_APP_CEPAPI_URL,
        ws: true,
        changeOrigin: true
      },
			'/api': {
				target: process.env.VUE_APP_API_URL ? process.env.VUE_APP_API_URL : 'http://localhost:8000',
				secure: false,
				changeOrigin: true
			},
		}
	},
	css: {
		loaderOptions: {
			sass: {
				data: "@import '~@/stylesheets/main.scss';",
				includePaths: [
					require("bourbon-neat").includePaths,
				]
			}
		}
	},
	configureWebpack: {
		plugins: [
			new webpack.ProvidePlugin({
			  $: "jquery",
			  jQuery: "jquery"
			})
		],

	}
}
