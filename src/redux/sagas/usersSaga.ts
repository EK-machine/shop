import { takeEvery, put, call, fork, SagaReturnType } from 'redux-saga/effects';
import {
  getUsersRequest,
  getUsersSuccess,
  getUsersFailed,
  createUserRequest,
  createUserSuccess,
  createUserFailed,
  setAvatarRequest,
  setAvatarSuccess,
  setAvatarFailed,
  setLoginRequest,
  setLoginSuccess,
  setLoginFailed,
  setPasswordRequest,
  setPasswordSuccess,
  setPasswordFailed,
} from '../slices/userSlice';
import { apiGetUsers, apiPostUser, apiPatchUser } from '../../api/apis';

import { UserProfile } from '../../interfaces/intefaces';

export function* workerGetUsersSaga() {
  try {
    const users: SagaReturnType<typeof apiGetUsers> = yield call(apiGetUsers);
    yield put({ type: getUsersSuccess.type, payload: users });
  } catch (e) {
    yield put({
      type: getUsersFailed.type,
      payload: `Get users error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerPostUserSaga(action: { type: typeof createUserRequest.type; payload: UserProfile }) {
  try {
    yield call(apiPostUser, action.payload);
    yield put({ type: createUserSuccess.type, payload: action.payload });
  } catch (e) {
    yield put({
      type: createUserFailed.type,
      payload: `Create user error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerSetAvatarSaga(action: {
  type: typeof setAvatarRequest.type;
  payload: { id: number; imgUrl: string };
}) {
  try {
    const changeAvatar = () => apiPatchUser(action.payload.id.toString(), { imgUrl: action.payload.imgUrl });
    yield call(changeAvatar);
    yield put({ type: setAvatarSuccess.type, payload: { imgUrl: action.payload.imgUrl } });
  } catch (e) {
    yield put({
      type: setAvatarFailed.type,
      payload: `Set avatar error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerSetLoginSaga(action: {
  type: typeof setLoginRequest.type;
  payload: { id: number; login: string };
}) {
  try {
    const changeLogin = () => apiPatchUser(action.payload.id.toString(), { login: action.payload.login });
    yield call(changeLogin);
    yield put({ type: setLoginSuccess.type, payload: { login: action.payload.login } });
  } catch (e) {
    yield put({
      type: setLoginFailed.type,
      payload: `Set login error: ${(e as { message: string }).message}`,
    });
  }
}

export function* workerSetPasswordSaga(action: {
  type: typeof setPasswordRequest.type;
  payload: { id: number; password: string };
}) {
  try {
    const changePass = () => apiPatchUser(action.payload.id.toString(), { password: action.payload.password });
    yield call(changePass);
    yield put({ type: setPasswordSuccess.type, payload: { password: action.payload.password } });
  } catch (e) {
    yield put({
      type: setPasswordFailed.type,
      payload: `Set password error: ${(e as { message: string }).message}`,
    });
  }
}

export function* watchGetUserSaga() {
  yield takeEvery(getUsersRequest.type, workerGetUsersSaga);
}

export function* watchCreateUserSaga() {
  yield takeEvery(createUserRequest.type, workerPostUserSaga);
}

export function* watchSetAvatarSaga() {
  yield takeEvery(setAvatarRequest.type, workerSetAvatarSaga);
}

export function* watchSetLoginSaga() {
  yield takeEvery(setLoginRequest.type, workerSetLoginSaga);
}

export function* watchSetPasswordSaga() {
  yield takeEvery(setPasswordRequest.type, workerSetPasswordSaga);
}

export const usersSaga = [
  fork(watchGetUserSaga),
  fork(watchCreateUserSaga),
  fork(watchSetAvatarSaga),
  fork(watchSetLoginSaga),
  fork(watchSetPasswordSaga),
];
