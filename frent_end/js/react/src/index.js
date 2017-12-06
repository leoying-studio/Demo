import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducers } from "./redux";
const store = createStore(reducers);
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>, 
		document.getElementById('root')
	);
// registerServiceWorker();
