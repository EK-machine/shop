import { debounce, put, call, fork, SagaReturnType } from 'redux-saga/effects';
import { debounceProductsRequest, debounceProductsSuccess, debounceProductsFailed } from '../slices/allProductsSlice';
import { apiGetProduct } from '../../api/apis';

export function* workerProductsDebounceSaga(action: { type: typeof debounceProductsRequest.type; payload: string }) {
  try {
    const products: SagaReturnType<typeof apiGetProduct> = yield call(apiGetProduct, action.payload);
    yield put({ type: debounceProductsSuccess.type, payload: products });
  } catch (e) {
    yield put({
      type: debounceProductsFailed.type,
      payload: `Get debounce products error: ${(e as { message: string }).message}`,
    });
  }
}

export function* watchProductsDebounceSaga() {
  yield debounce(700, debounceProductsRequest.type, workerProductsDebounceSaga);
}

export const productsDebounceSaga = [fork(watchProductsDebounceSaga)];
