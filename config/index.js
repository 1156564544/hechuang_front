// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    // assetsPublicPath: '/vue-admin/',
	assetsPublicPath: './',
	// proxyTable: {
	//   '/api': {
	//     target: 'http://124.71.27.112:9000',
	//     changeOrigin: true,
	//     pathRewrite: {
	// 	  '^/api': '/'
	//     }
	//   }
	// },
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  
  dev: {
    env: require('./dev.env'),
	host: 'localhost', // can be overwritten by process.env.HOST
	port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
	errorOverlay: true,
	notifyOnErrors: true,
	poll: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
	  // '/api': {
	  //   target: 'http://124.71.27.112:9000',
	  //   changeOrigin: true,
	  //   pathRewrite: {
		 //  '^/api': '/'
	  //   }
	  // }
	},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
