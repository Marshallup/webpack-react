import { someWatcher } from './watchers';
import { all, spawn } from 'redux-saga/effects';

export default function* generalSaga() {
    yield all([
        spawn(someWatcher),
    ]);
}