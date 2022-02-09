import { takeEvery } from 'redux-saga/effects';
import { someWorker } from 'sagas/generalSaga/workers';
import { PAGE_LOADER } from 'reducers/generalReducer/types';

export function* someWatcher() {
    yield takeEvery(PAGE_LOADER, someWorker);
}