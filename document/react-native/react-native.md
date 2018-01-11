# 一, react-native  的环境搭建。
## 1、普通安装
(1)、 npm install -g react-native-cli   //安装脚手架
(2).  react-native-cli init "项目名称"  // 初始化项目

## 2、 yarn 安装
相关软件可以在\\192.168.30.247\yryz\softwares\前端\reactnative 获取，编辑器建议使用vscode
### 1).按照nodejs
安装完node后建议设置npm镜像以加速后面的过程
npm config set registry https://registry.npm.taobao.org --global
npm config set disturl https://npm.taobao.org/dist --global
### 2).安装yarn
Yarn是Facebook提供的替代npm的工具，可以加速node模块的下载。React Native的命令行工具用于执行创建、初始化、更新项目、运行打包服务（packager）等任务。
npm install -g yarn react-native-cli
安装完yarn后同理也要设置镜像源：
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
安装完yarn之后就可以用yarn代替npm了，例如用yarn代替npm install命令，用yarn add 某第三方库名代替npm install --save 某第三方库名。
### 3).按照expo软件，ios在appsotore自行下载，安卓在共享目录中有安装apk
### 4).命令行进入项目目录 ，执行yarn 下载依赖包
执行 yarn start 打开调试应用


## 3.脚手架安装
$ npm i -g create-react-native-app
$ create-react-native-app my-project
$ cd my-project
$ npm start

# react-navigation 导航组件
## react-navigation
   ### (1) 安装之后通过import 导入   import { TabNavigator, StackNavigator } from 'react-navigation';
   ### (2) 其中react-navigation  包含多个组件，其中包括 tabNavigator 类似  tab 的这种tab切换页面导航菜单， stackNavigator 是整个路由导航的创建，可以直接
   进行路由导航配置。
   ### (3) 普通导航路由的创建: 
		可以直接调用 StackNavigator({
			Home: {
				screen: Home,
				navigationOptions: {
					// 路由导航的配置项
					headerTitle: "Home",
					headerStyle: {backgroundColor: 'green'},  //导航栏的样式
					headerTitleStyle: {},
					headerLeft: <Button></Button>,			
				}
			},
			Friends: {
				screen: Friends,
				title: 'Friends'
			}
		});   //这样创建了最简单的路由对象
	### (4) 通过TabNavigator 创建带有 Tab 的导航页面
		TabNavigator(RouteConfigs, TabNavigatorConfig)
		const instance = StackNavigator({ Home:{title:'首页', screen: HomeScreen} },{ /*路由配置项*/})
		stackNavigator({
			Root: {
				screen: TabNavigator({
					// 通过TabNavigator  来添加多个屏幕对象，最后将该实例赋值给  screen属性
				})
			}
		})
	### (5)路由导航的跳转   TabNavigator(RouteConfigs, TabNavigatorConfig)
		(6)navigation属性中提供了很多的函数简化界面间操作，简单列举几点：
		####（1）通过navigate函数实现界面之间跳转：
			this.props.navigation.navigate('Mine');  
			参数为我们在StackNavigator注册界面组件时的名称。同样也可以从当前页面返回到上一页：
			// 返回上一页  
			this.props.navigation.goBack();  
		####（2）跳转时传值：
			this.props.navigation.navigate('Mine',{info:'传值过去'});  
			第一个参数同样为要跳转的界面组件名称，第二个参数为要传递的参数，info可以理解为key，后面即传递的参数。
		####（3）获取值：
		{this.props.navigation.state.params.info}  
	
#二、React-Native 组件技巧
1.Text  组件可以通过"numberOfLines" 属性控制最多显示的行数,超出部分自动显示省略号.
配合numberOfLines属性可以看到,ellipsizeMode属性有四个属性: head  头部显示省略号, middle 中间显示, tail(默认值)  ellipsizeMode='middle'
native  base  
之前的版本可以通过获取当前节点的高度来控制然后再后面添加一个<Text></Text>添加....,  但是并不推荐


#三、组件的样式设置
	水平方向的padding: paddingHorizontal
	垂直方向的padding：paddingVertical   垂直方向填充
	IOS背景有底色的问题:
		场景: 定位一个返回按钮在屏幕的左上角，  android显示正常，但是ios平台显示有白色的底色。
		处理方法：将外层的view  设置backgroundColor: 'transparent'  属性(解决).

#四、redux的使用
  触发redux, 执行(reducer)和响应(getState)三部分部分。 
1. reducer 的设置:	
	const counter = 0;
	export function(state, action) {
		if (action.type == "ADD") {
			return counter+=1;
		}
	}
2. redux  的触发
   this.props.dispatch("ADD");
3. redux 的接收
	import {createStore} from 'redux';
	import reducer from './reducer';
    const store = createStore(reducer);
	store.subscribe(() => {
		// 监听dispatch的触发
		store.getState();
	});
	
执行过程: 


# 五、网络图片的缓存策略
React Native 框架支持对网络图片的缓存，如果图片缓存到本地，以后一直使用这个缓存，不管服务器侧该文件是否发生改变。

## 1，使用样例
我们只需要在指定 Image 数据源时，在 source 属性中加入 cache 键以明确我们期望使用的图片缓存策略即可。
<Image style={styles.image} source={{
  uri: 'http://hangge.com/img.png 

',
  cache: 'force-cache'}} />

## 2，cache 可选值
default：使用平台默认策略
reload：数据将从原始地址加载，不使用现有的缓存数据。
force-cache：总是使用缓存数据，如果没有缓存，则从原始地址加载。
only-if-cached：总是使用缓存数据，如果没有缓存，则失败。

# 六、ViewPagerAndroid  该功能主要是提供安卓平台滑动分页的功能。 ios平台可以使用ScrollView 来做分页切换
但是ScrollView  在安卓平台多次加载会有严重的性能问题可以通过平台去判断， 然后选择不同的组件来分页处理。

ViewPagerAndroid 的弊端:  组件实例化之后没办法通过  setState 再次改变属性(不能再次渲染),  一般在组件实例化之前指定好属性
实例化之后无法再次渲染render



# 触摸手势：PanResponder（响应）
# 滚动视图:  ScrollView  
> 常用的属性: 
  1 horizontal  设置为水平方向滚动
  2 pagingEnabled	设置为ture的时候当手势超过一半会自动跳转到下一页,视觉会有一种沾粘的效果
  
  


# question:   
	## 1.组件如果使用类的修饰器可能会导致父组件无法通过"refs"属性来获取子组件实例。  建议去除类的修饰器，改用其他的。
	## 2.根据flatList  组件中提供的仅(ios)有 "onScroll" 功能  在滚动过程中可以捕获到， android中无法捕获到。
	## 3. 提示  “React Native 版本错误”  解决方法: yarn env test  然后yarn install  一下。 重启OK
	## 4.安卓平台添加投影效果:  需要额外添加一个 'elevation'属性, 另外背景需要有指定颜色，不写或者写transparent那么会看不到效果。
	## 5.panResponder 与flatList  有冲突
	## 6. <View style={{flexDirection: 'row', }}>
			<Text></Text>
	   </View>
	此时Text  如果不设置 flex: 1,  iphone 6 上会显示不全文字	
	## 7. 有时候为了封装一个组件，为了将值均传递给组件, 可以使用{...this.props}展开所有属性。  但是这个时候问题来了，如果当前组件已经
	定义该属性，是不会调用传递的方法，以当前组件的属性为主。
	```
		<flowList {...this.props} onRefresh={()=>{}}/>  //这种情况下即使父组件传递了onRefresh属性,依然不会去使用。
		但是使用this.props.onRefresh  依然可以获取到
	```
	## 8. image 图片如果是安卓平台需要添加样式属性  overlayColor: '#fff',  否则可能会有圆角显示不全的情况。

	