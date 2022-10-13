import { takeEvery, put, call, spawn, all, select, delay } from 'redux-saga/effects';
import {
  setOrderRequest,
  setOrderSuccess,
  setOrderFailed,
  deleteOrderRequest,
  deleteOrderSuccess,
  deleteOrderFailed,
} from 'ReduxSlices/userSlice';
import { setPendingTrue, setPendingFalse } from 'ReduxSlices/pendingSlice';
import { apiPatchUser } from 'Apis/apis';
import { setError } from 'ReduxSlices/errorSlice';
import alert from 'Components/Alert/Alert';
import { AppStateType, UserOrder } from '../../interfaces/intefaces';

export function* workerSetOrderSaga(action: {
  type: typeof setOrderRequest.type;
  payload: { id: number; orders: UserOrder[]; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const setOrder = () => apiPatchUser(action.payload.id.toString(), { orders: action.payload.orders });
    yield call(setOrder);
    yield all([
      put({ type: setOrderSuccess.type, payload: { orders: action.payload.orders } }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success('Your order was placed successfully');
  } catch (e) {
    const message = `Add order error: ${(e as { message: string }).message}`;
    alert.error(message);
    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: setOrderFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
  }
}

export function* workerDeleteOrderSaga(action: {
  type: typeof deleteOrderRequest.type;
  payload: { id: number; orders: UserOrder[]; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const deleteOrder = () => apiPatchUser(action.payload.id.toString(), { orders: action.payload.orders });
    yield call(deleteOrder);
    yield all([
      put({ type: deleteOrderSuccess.type, payload: { orders: action.payload.orders } }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success('Your order was cancelled successfully');
  } catch (e) {
    const message = `Delete order error: ${(e as { message: string }).message}`;
    alert.error(message);

    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: deleteOrderFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
  }
}

export function* watchSetOrderSaga() {
  yield takeEvery(setOrderRequest.type, workerSetOrderSaga);
}

export function* watchDeleteOrderSaga() {
  yield takeEvery(deleteOrderRequest.type, workerDeleteOrderSaga);
}

export const ordersSaga = [spawn(watchSetOrderSaga), spawn(watchDeleteOrderSaga)];
