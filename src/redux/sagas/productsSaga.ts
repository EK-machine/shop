import { takeEvery, put, call, fork, SagaReturnType, debounce } from 'redux-saga/effects';
import {
  allProductsRequest,
  setAllProducts,
  allProductsFailed,
  debounceProductsRequest,
  debounceProductsSuccess,
  debounceProductsFailed,
} from '../slices/allProductsSlice';
import { apiGetProducts, apiGetProduct } from '../../api/apis';
import alert from '../../components/Alert/Alert';

export function* workerGetAllProductsSaga() {
  try {
    const products: SagaReturnType<typeof apiGetProducts> = yield call(apiGetProducts);
    yield put({ type: setAllProducts.type, payload: products });
  } catch (e) {
    const message = `Get all products error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: allProductsFailed.type,
      payload: message,
    });
  }
}

export function* workerProductsDebounceSaga(action: { type: typeof debounceProductsRequest.type; payload: string }) {
  try {
    const products: SagaReturnType<typeof apiGetProduct> = yield call(apiGetProduct, action.payload);
    yield put({ type: debounceProductsSuccess.type, payload: products });
  } catch (e) {
    const message = `Get debounce products error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: debounceProductsFailed.type,
      payload: message,
    });
  }
}

export function* watchProductsDebounceSaga() {
  yield debounce(700, debounceProductsRequest.type, workerProductsDebounceSaga);
}

export function* watchGetAllProductsSaga() {
  yield takeEvery(allProductsRequest.type, workerGetAllProductsSaga);
}

export const productsSaga = [fork(watchGetAllProductsSaga), fork(watchProductsDebounceSaga)];
