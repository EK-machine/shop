import { takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  setLikeRequest,
  setLikeSuccess,
  setLikeFailed,
  unsetLikeRequest,
  unsetLikeSuccess,
  unsetLikeFailed,
} from '../slices/userSlice';
import { apiPatchUser } from '../../api/apis';
import { UserLikedItem } from '../../interfaces/intefaces';
import alert from '../../components/Alert/Alert';

export function* workerSetLikeSaga(action: {
  type: typeof setLikeRequest.type;
  payload: { id: number; liked: UserLikedItem[] };
}) {
  try {
    const setLike = () => apiPatchUser(action.payload.id.toString(), { liked: action.payload.liked });
    yield call(setLike);
    yield put({ type: setLikeSuccess.type, payload: { liked: action.payload.liked } });
  } catch (e) {
    const message = `Set like error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: setLikeFailed.type,
      payload: message,
    });
  }
}

export function* workerUnsetLikeSaga(action: {
  type: typeof unsetLikeRequest.type;
  payload: { id: number; liked: UserLikedItem[] };
}) {
  try {
    const unsetLike = () => apiPatchUser(action.payload.id.toString(), { liked: action.payload.liked });
    yield call(unsetLike);
    yield put({ type: unsetLikeSuccess.type, payload: { liked: action.payload.liked } });
  } catch (e) {
    const message = `Unset like error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: unsetLikeFailed.type,
      payload: message,
    });
  }
}

export function* watchSetLikeSaga() {
  yield takeEvery(setLikeRequest.type, workerSetLikeSaga);
}

export function* watchUnsetLikeSaga() {
  yield takeEvery(unsetLikeRequest.type, workerUnsetLikeSaga);
}

export const likedSaga = [fork(watchSetLikeSaga), fork(watchUnsetLikeSaga)];
