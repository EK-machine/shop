import { takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailed,
  deleterFromCartRequest,
  deleterFromCartSuccess,
  deleterFromCartFailed,
  changeQuantityRequest,
  changeQuantitySuccess,
  changeQuantityFailed,
} from '../slices/userSlice';
import { apiPatchUser } from '../../api/apis';
import { UserCartItem } from '../../interfaces/intefaces';

export function* workerAddToCartSaga(action: {
  type: typeof addToCartRequest.type;
  payload: { id: number; cart: UserCartItem[] };
}) {
  try {
    const addToCart = () => apiPatchUser(action.payload.id.toString(), { cart: action.payload.cart });
    yield call(addToCart);
    yield put({ type: addToCartSuccess.type, payload: { cart: action.payload.cart } });
  } catch (e) {
    yield put({
      type: addToCartFailed.type,
      payload: `Add cart item error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerDeleteFromCartSaga(action: {
  type: typeof deleterFromCartRequest.type;
  payload: { id: number; cart: UserCartItem[] };
}) {
  try {
    const deleteFromCart = () => apiPatchUser(action.payload.id.toString(), { cart: action.payload.cart });
    yield call(deleteFromCart);
    yield put({
      type: deleterFromCartSuccess.type,
      payload: { cart: action.payload.cart },
    });
  } catch (e) {
    yield put({
      type: deleterFromCartFailed.type,
      payload: `Delete cart item error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerChangeQuantitySaga(action: {
  type: typeof changeQuantityRequest.type;
  payload: { id: number; cart: UserCartItem[] };
}) {
  try {
    const changeQuantity = () => apiPatchUser(action.payload.id.toString(), { cart: action.payload.cart });
    yield call(changeQuantity);
    yield put({
      type: changeQuantitySuccess.type,
      payload: { cart: action.payload.cart },
    });
  } catch (e) {
    yield put({
      type: changeQuantityFailed.type,
      payload: `Change quantity error: ${(e as { message: string }).message}`,
    });
  }
}

export function* watchAddToCartSaga() {
  yield takeEvery(addToCartRequest.type, workerAddToCartSaga);
}

export function* deleteFromCartSaga() {
  yield takeEvery(deleterFromCartRequest.type, workerDeleteFromCartSaga);
}

export function* changeQuantitySaga() {
  yield takeEvery(changeQuantityRequest.type, workerChangeQuantitySaga);
}

export const cartSaga = [fork(watchAddToCartSaga), fork(deleteFromCartSaga), fork(changeQuantitySaga)];
