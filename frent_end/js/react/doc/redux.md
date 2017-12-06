# redux 的使用
> ## 先来看个例子
```jsx

import React,{Component} from 'react'
import {connect} from 'react-redux'
class App extends Component{
render() {
      return (
    	<div>
    	  <button onClick={this._onClick.bind(this)}>{this.props.counter}</button>
    	</div>)
}
_onClick () {
  this.props.dispatch({type:"ADD"})
}
function mapStateToProps (state) { // 手动注入state，之后触发reducer,dispatch分发器被connect自动注入
  return { // 注入的内容自行选择
	counter: state.counter
  }
}
 export default connect(mapStateToProps)(App)
````
###### 这是一个完整的单个组件的redux 操作的例子， 其中结合了react-redux 的connect属性来整合 UI视图的关联。
> ## redux 完整数据流可以分为三块:
- actions 执行的名称:  例子中的dispatch方法参数中的type
- reducer 根据传递的值做逻辑处理之后返回新的状态值
- 状态的获取  `this.props.value`   value 为自己的当前存储值得名称

###### 为了便于管理往往会将以上三个步骤进一步细化
 - 可以新建actions 文件夹 reducers文件夹 和store文件夹
 - actions文件夹中存放多个action文件并导出名称
 例如actions/counter.js
```
//1. 定义actions 执行名称
export const ADD_COUNT = "ADD_COUNT";
export const MINUS_COUNT = "MINUS_COUNT";
//2. reducer 中导入进去,逻辑处理后并返回新的值
import {ADD_COUNT, MINUS_COUNT} from "./counter";
import {ADD_COUNT, MINUS_COUNT} from './../actions/counter';
const defaultState = 0;
export function Counter(state = defaultState, action) {
	if (action.type == ADD_COUNT) {
		return state += 1;
	}

	if (action.type == MINUS_COUNT) {
		return state -= 1;
	}

	return state;
}
//3. 合并reducer,如果有更多的话,提供了多个reducer合并返回reducers
import { createStore, combineReducers } from 'redux';
// reducer 中的这个js
import {Counter} from './reducer/counter';
export const reducers = combineReducers({ Counter });
//4. 生成store
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from "./redux";
const store = createStore(reducers);
ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		document.getElementById('root')
	);
```
###### 以上是数据流大致的拆分过程
 1. 定义actions名
 2. 依赖定义reducer逻辑和返回值(规范)
 3. 使用redux中的 `combineReducers` 属性， 来合并整个reducer ，参数为对象。
 4. 使用redux 中的createStore 来创建store会返回一个全新的store对象。  可以通过
 store.getState() 来获取全局的redux值。


 

