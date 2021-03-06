 module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    configureWebpack: {
      externals:{
        AMap: "window.AMap"
      },
		  resolve: {
			alias: {
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views ',
			}
		}
	},
    devServer: {
        // proxy: {
        //     '/api':{
        //         target:'http://jsonplaceholder.typicode.com',
        //         changeOrigin:true,
        //         pathRewrite:{
        //             '/api':''
        //         }
        //     }
        // }
    }
}