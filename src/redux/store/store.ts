import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import commonReducer from '../slices/commonStateSlice';
import headingReducer from '../slices/headingSlice';
import userProfileReducer from '../slices/userProfileSlice';
import modalContentReducer from '../slices/modalContentSlice';
import allProductsReducer from '../slices/allProductsSlice';

const rootReducer = combineReducers({
  common: commonReducer,
  heading: headingReducer,
  user: userProfileReducer,
  modal: modalContentReducer,
  products: allProductsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
