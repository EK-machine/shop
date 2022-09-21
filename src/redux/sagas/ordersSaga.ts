import { takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  setOrderRequest,
  setOrderSuccess,
  setOrderFailed,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,
} from '../slices/userSlice';
import { apiPatchUser } from '../../api/apis';
import { UserOrder } from '../../interfaces/intefaces';

export function* workerSetOrderSaga(action: {
  type: typeof setOrderRequest.type;
  payload: { id: number; orders: UserOrder[] };
}) {
  try {
    const setOrder = () => apiPatchUser(action.payload.id.toString(), { orders: action.payload.orders });
    yield call(setOrder);
    yield put({ type: setOrderSuccess.type, payload: { orders: action.payload.orders } });
  } catch (e) {
    yield put({
      type: setOrderFailed.type,
      payload: `Add order error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerDeleteOrderSaga(action: {
  type: typeof deleteOrderRequest.type;
  payload: { id: number; orders: UserOrder[] };
}) {
  try {
    const deleteOrder = () => apiPatchUser(action.payload.id.toString(), { orders: action.payload.orders });
    yield call(deleteOrder);
    yield put({ type: deleteOrderSuccess.type, payload: { orders: action.payload.orders } });
  } catch (e) {
    yield put({
      type: deleteOrderFailed.type,
      payload: `Delete order error: ${(e as { message: string }).message}`,
    });
  }
}

export function* watchSetOrderSaga() {
  yield takeEvery(setOrderRequest.type, workerSetOrderSaga);
}

export function* watchDeleteOrderSaga() {
  yield takeEvery(deleteOrderRequest.type, workerDeleteOrderSaga);
}

export const ordersSaga = [fork(watchSetOrderSaga), fork(watchDeleteOrderSaga)];
