
import { createStore, combineReducers } from 'redux';
import {Counter} from './reducer/counter';
export const reducers = combineReducers({ Counter });
