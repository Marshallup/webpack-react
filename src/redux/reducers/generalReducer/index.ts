import initialState from './state';
import { PAGE_LOADER } from './types';

export default function generalReducer (state = initialState, action: { type: typeof PAGE_LOADER, payload: boolean }) {
	switch (action.type) {
		case PAGE_LOADER:
			return { ...state, pageLoader: action.payload, }
		default:
			return state;
	}
}