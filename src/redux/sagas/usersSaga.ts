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
import alert from '../../components/Alert/Alert';

import { UserProfile } from '../../interfaces/intefaces';

export function* workerGetUsersSaga() {
  try {
    const users: SagaReturnType<typeof apiGetUsers> = yield call(apiGetUsers);
    yield put({ type: getUsersSuccess.type, payload: users });
  } catch (e) {
    const message = `Get users error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: getUsersFailed.type,
      payload: message,
    });
  }
}

export function* workerPostUserSaga(action: { type: typeof createUserRequest.type; payload: UserProfile }) {
  try {
    yield call(apiPostUser, action.payload);
    yield put({ type: createUserSuccess.type, payload: action.payload });
    alert.success('You have rigistered successfully');
  } catch (e) {
    const message = `Create user error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: createUserFailed.type,
      payload: message,
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
    alert.success('Your avatar was successfully changed');
  } catch (e) {
    const message = `Set avatar error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: setAvatarFailed.type,
      payload: message,
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
    alert.success('Your login was successfully changed');
  } catch (e) {
    const message = `Set login error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: setLoginFailed.type,
      payload: message,
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
    alert.success('Your password was successfully changed');
  } catch (e) {
    const message = `Set password error: ${(e as { message: string }).message}`;
    alert.error(message);
    yield put({
      type: setPasswordFailed.type,
      payload: message,
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
