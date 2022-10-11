import { takeEvery, take, put, call, spawn, all, select, delay } from 'redux-saga/effects';
import {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailed,
  deleteFromCartRequest,
  deleterFromCartSuccess,
  deleterFromCartFailed,
  changeQuantityRequest,
  changeQuantitySuccess,
  changeQuantityFailed,
} from '../slices/userSlice';
import { setError } from '../slices/errorSlice';
import { apiPatchUser } from '../../api/apis';
import { AppStateType, UserCartItem } from '../../interfaces/intefaces';
import alert from '../../components/Alert/Alert';
import { setPendingTrue, setPendingFalse } from '../slices/pendingSlice';

export function* workerAddToCartSaga(action: {
  type: typeof addToCartRequest.type;
  payload: { id: number; cart: UserCartItem[]; title: string; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const addToCart = () => apiPatchUser(action.payload.id.toString(), { cart: action.payload.cart });
    yield call(addToCart);
    yield all([
      put({ type: addToCartSuccess.type, payload: { cart: action.payload.cart } }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success(`${action.payload.title} has been added to cart`);
  } catch (e) {
    const message = `Add cart item error: ${(e as { message: string }).message}`;
    alert.error(message);

    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: addToCartFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
  }
}

export function* workerDeleteFromCartSaga(action: {
  type: typeof deleteFromCartRequest.type;
  payload: { id: number; cart: UserCartItem[]; title: string; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const deleteFromCart = () => apiPatchUser(action.payload.id.toString(), { cart: action.payload.cart });
    yield call(deleteFromCart);
    yield all([
      put({
        type: deleterFromCartSuccess.type,
        payload: { cart: action.payload.cart },
      }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success(`${action.payload.title} has been removed from cart`);
  } catch (e) {
    const message = `Delete cart item error: ${(e as { message: string }).message}`;
    alert.error(message);
    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };

    yield all([
      put({
        type: deleterFromCartFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
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
    const message = `Change quantity error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: changeQuantityFailed.type,
      payload: message,
    });
  }
}

export function* watchAddToCartSaga() {
  while (true) {
    const action: {
      type: string;
      payload: {
        id: number;
        cart: UserCartItem[];
        title: string;
        prodId: number;
      };
    } = yield take(addToCartRequest.type);
    yield call(workerAddToCartSaga, action);
  }
}

export function* deleteFromCartSaga() {
  while (true) {
    const action: {
      type: string;
      payload: {
        id: number;
        cart: UserCartItem[];
        title: string;
        prodId: number;
      };
    } = yield take(deleteFromCartRequest.type);
    yield call(workerDeleteFromCartSaga, action);
  }
}

export function* changeQuantitySaga() {
  yield takeEvery(changeQuantityRequest.type, workerChangeQuantitySaga);
}

export const cartSaga = [spawn(watchAddToCartSaga), spawn(deleteFromCartSaga), spawn(changeQuantitySaga)];
