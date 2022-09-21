import { takeEvery, put, call, fork, SagaReturnType } from 'redux-saga/effects';
import { allProductsRequest, setAllProducts, allProductsFailed } from '../slices/allProductsSlice';
import { apiGetProducts } from '../../api/apis';

export function* workerGetAllProductsSaga() {
  try {
    const products: SagaReturnType<typeof apiGetProducts> = yield call(apiGetProducts);
    yield put({ type: setAllProducts.type, payload: products });
  } catch (e) {
    yield put({
      type: allProductsFailed.type,
      payload: `Get all products error: ${(e as { message: string }).message}`,
    });
  }
}

export function* watchGetAllProductsSaga() {
  yield takeEvery(allProductsRequest.type, workerGetAllProductsSaga);
}

export const productsSaga = [fork(watchGetAllProductsSaga)];
