import { all, spawn } from 'redux-saga/effects';
import generalSaga from './generalSaga';

export default function* rootSaga() {
    yield all([
        spawn(generalSaga),
    ]);
}