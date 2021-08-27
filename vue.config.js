const tsImportPluginFactory = require("ts-import-plugin");
const merge = require("webpack-merge");
module.exports = {
	//publicPath: "/web/",
	devServer: {
		proxy: {
			"/api": {
				//target: "http://106.53.115.30:80/",
				target: "http://localhost:8000",
				changeOrigin: true, // 允许跨域
				pathRewrite: {
					// 重写路径
					//"^/api": ""
				}
			}
		}
	},
	chainWebpack(config) {
		// 配置VantUI按需引入
		config.module
			.rule("ts")
			.use("ts-loader")
			.tap(options => {
				options = merge(options, {
					transpileOnly: true,
					getCustomTransformers: () => ({
						before: [
							tsImportPluginFactory({
								libraryName: "vant",
								libraryDirectory: "es",
								style: true
							})
						]
					}),
					compilerOptions: {
						module: "es2015"
					}
				});
				return options;
			});
	}
};
