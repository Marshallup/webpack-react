import { PAGE_LOADER } from './types';

export function setPageLoader(status) {
	return {
		type: PAGE_LOADER,
		payload: status,
	}
}