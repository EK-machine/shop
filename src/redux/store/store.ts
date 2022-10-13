import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commonReducer from 'ReduxSlices/commonStateSlice';
import headingReducer from 'ReduxSlices/headingSlice';
import userReducer from 'ReduxSlices/userSlice';
import modalContentReducer from 'ReduxSlices/modalContentSlice';
import allProductsReducer from 'ReduxSlices/allProductsSlice';
import pendingReducer from 'ReduxSlices/pendingSlice';
import errorsReducer from 'ReduxSlices/errorSlice';
import rootSaga from '../sagas/rootSaga';

const rootReducer = combineReducers({
  common: commonReducer,
  heading: headingReducer,
  modal: modalContentReducer,
  products: allProductsReducer,
  user: userReducer,
  pending: pendingReducer,
  errors: errorsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);

export default store;
