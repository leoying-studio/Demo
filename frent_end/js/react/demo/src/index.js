import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from "./redux";

// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	// 通过使用Provider 所有的子组件全部拥有该props属性
		<Provider store={store}>
			<App />
		</Provider>, 
		document.getElementById('root')
	);
// registerServiceWorker();
