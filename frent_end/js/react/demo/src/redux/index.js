
import { createStore, combineReducers } from 'redux';
import {Counter} from './reducer/counter';
const reducers = combineReducers({ Counter });
export default createStore(reducers);
