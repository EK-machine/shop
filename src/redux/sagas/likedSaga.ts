import { takeEvery, put, call, spawn, all, select } from 'redux-saga/effects';
import {
  setLikeRequest,
  setLikeSuccess,
  setLikeFailed,
  unsetLikeRequest,
  unsetLikeSuccess,
  unsetLikeFailed,
} from 'ReduxSlices/userSlice';
import { setError } from 'ReduxSlices/errorSlice';
import { apiPatchUser } from 'Apis/apis';
import { AppStateType, UserLikedItem } from 'Interfaces/intefaces';
import alert from 'Components/Alert/Alert';

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
