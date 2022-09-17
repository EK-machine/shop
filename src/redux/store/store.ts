import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commonReducer from '../slices/commonStateSlice';
import headingReducer from '../slices/headingSlice';
import userReducer from '../slices/userSlice';
import modalContentReducer from '../slices/modalContentSlice';
import allProductsReducer from '../slices/allProductsSlice';
import rootSaga from '../sagas/rootSaga';

const rootReducer = combineReducers({
  common: commonReducer,
  heading: headingReducer,
  modal: modalContentReducer,
  products: allProductsReducer,
  user: userReducer,
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
