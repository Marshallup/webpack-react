import initialState from './state';
import { PAGE_LOADER } from './types';

export default function generalReducer (state = initialState, action) {
	switch (action.type) {
		case PAGE_LOADER:
			return { ...state, pageLoader: action.payload, }
		default:
			return state;
	}
}