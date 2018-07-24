import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';

import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['expoToken'],
  },
  reducers
);

const enhancer = compose(
  applyMiddleware(sagaMiddleware),
);

export default () => {
  let store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);

  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};
