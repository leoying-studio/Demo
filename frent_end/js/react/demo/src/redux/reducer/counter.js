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