import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from 'reducers/index';
import rootSaga from './sagas';
import { IS_DEV } from 'utils/constants';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    combineReducers(reducers),
    compose(
        applyMiddleware(
            sagaMiddleware,
        ),
      IS_DEV ? (window as any)?.__REDUX_DEVTOOLS_EXTENSION__() : (fn: typeof compose) => fn,
    )
);

sagaMiddleware.run(rootSaga);

export default store;