# vue项目之webpack 中的@符号路径
```
	在build 文件夹下找到 *webpack.base.conf.js*,  找到resolve函数里面的 alias配置属性
	
		resolve: {
			extensions: ['.js', '.vue', '.json'],
			alias: {
				'vue$': 'vue/dist/vue.esm.js',
				'@': resolve('src/ccomponents'),  // 可识别到根路径下的components
			}
		}
```
