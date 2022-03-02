import { PAGE_LOADER } from './types';

export function setPageLoader(status: boolean) {
	return {
		type: PAGE_LOADER,
		payload: status,
	}
}