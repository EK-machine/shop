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
import alert from '../../components/Alert/Alert';

export function* workerSetOrderSaga(action: {
  type: typeof setOrderRequest.type;
  payload: { id: number; orders: UserOrder[] };
}) {
  try {
    const setOrder = () => apiPatchUser(action.payload.id.toString(), { orders: action.payload.orders });
    yield call(setOrder);
    yield put({ type: setOrderSuccess.type, payload: { orders: action.payload.orders } });
    alert.success('Your order was placed successfully');
  } catch (e) {
    const message = `Add order error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: setOrderFailed.type,
      payload: message,
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
    alert.success('Your order was cancelled successfully');
  } catch (e) {
    const message = `Delete order error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: deleteOrderFailed.type,
      payload: message,
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
