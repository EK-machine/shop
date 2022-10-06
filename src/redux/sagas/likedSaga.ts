import { takeEvery, put, call, spawn, all, select } from 'redux-saga/effects';
import {
  setLikeRequest,
  setLikeSuccess,
  setLikeFailed,
  unsetLikeRequest,
  unsetLikeSuccess,
  unsetLikeFailed,
} from '../slices/userSlice';
import { setError } from '../slices/errorSlice';
import { apiPatchUser } from '../../api/apis';
import { AppStateType, UserLikedItem } from '../../interfaces/intefaces';
import alert from '../../components/Alert/Alert';

export function* workerSetLikeSaga(action: {
  type: typeof setLikeRequest.type;
  payload: { id: number; liked: UserLikedItem[]; title: string };
}) {
  try {
    const setLike = () => apiPatchUser(action.payload.id.toString(), { liked: action.payload.liked });
    yield call(setLike);
    yield put({ type: setLikeSuccess.type, payload: { liked: action.payload.liked } });
  } catch (e) {
    const message = `Set like error: ${(e as { message: string }).message}`;
    alert.error(message);
    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: setLikeFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
    ]);
  }
}

export function* workerUnsetLikeSaga(action: {
  type: typeof unsetLikeRequest.type;
  payload: { id: number; liked: UserLikedItem[]; title: string };
}) {
  try {
    const unsetLike = () => apiPatchUser(action.payload.id.toString(), { liked: action.payload.liked });
    yield call(unsetLike);
    yield put({ type: unsetLikeSuccess.type, payload: { liked: action.payload.liked } });
  } catch (e) {
    const message = `Unset like error: ${(e as { message: string }).message}`;
    alert.error(message);
    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: unsetLikeFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
    ]);
  }
}

export function* watchSetLikeSaga() {
  yield takeEvery(setLikeRequest.type, workerSetLikeSaga);
}

export function* watchUnsetLikeSaga() {
  yield takeEvery(unsetLikeRequest.type, workerUnsetLikeSaga);
}

export const likedSaga = [spawn(watchSetLikeSaga), spawn(watchUnsetLikeSaga)];
