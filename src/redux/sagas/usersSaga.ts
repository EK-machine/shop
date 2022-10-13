import { takeEvery, put, call, spawn, SagaReturnType, all, select, delay } from 'redux-saga/effects';
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
} from 'ReduxSlices/userSlice';
import { setPendingTrue, setPendingFalse } from 'ReduxSlices/pendingSlice';
import { setError } from 'ReduxSlices/errorSlice';
import { apiGetUsers, apiPostUser, apiPatchUser } from 'Apis/apis';
import alert from 'Components/Alert/Alert';

import { AppStateType, UserProfile } from '../../interfaces/intefaces';

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
  payload: { id: number; imgUrl: string; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const changeAvatar = () => apiPatchUser(action.payload.id.toString(), { imgUrl: action.payload.imgUrl });
    yield call(changeAvatar);
    yield all([
      put({ type: setAvatarSuccess.type, payload: { imgUrl: action.payload.imgUrl } }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success('Your avatar was successfully changed');
  } catch (e) {
    const message = `Set avatar error: ${(e as { message: string }).message}`;
    alert.error(message);

    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: setAvatarFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
  }
}

export function* workerSetLoginSaga(action: {
  type: typeof setLoginRequest.type;
  payload: { id: number; login: string; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const changeLogin = () => apiPatchUser(action.payload.id.toString(), { login: action.payload.login });
    yield call(changeLogin);
    yield all([
      put({ type: setLoginSuccess.type, payload: { login: action.payload.login } }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success('Your login was successfully changed');
  } catch (e) {
    const message = `Set login error: ${(e as { message: string }).message}`;
    alert.error(message);
    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: setLoginFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
  }
}

export function* workerSetPasswordSaga(action: {
  type: typeof setPasswordRequest.type;
  payload: { id: number; password: string; prodId: number };
}) {
  try {
    yield put({ type: setPendingTrue.type, payload: { id: action.payload.prodId, pending: true } });
    yield delay(1500);
    const changePass = () => apiPatchUser(action.payload.id.toString(), { password: action.payload.password });
    yield call(changePass);
    yield all([
      put({ type: setPasswordSuccess.type, payload: { password: action.payload.password } }),
      put({ type: setPendingFalse.type }),
    ]);
    alert.success('Your password was successfully changed');
  } catch (e) {
    const message = `Set password error: ${(e as { message: string }).message}`;
    alert.error(message);
    const state: AppStateType = yield select();
    const { errors } = state.errors;
    const newErrors = [...errors, message];
    const payload = { error: message, errors: newErrors };
    yield all([
      put({
        type: setPasswordFailed.type,
      }),
      put({
        type: setError.type,
        payload,
      }),
      put({ type: setPendingFalse.type }),
    ]);
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
  spawn(watchGetUserSaga),
  spawn(watchCreateUserSaga),
  spawn(watchSetAvatarSaga),
  spawn(watchSetLoginSaga),
  spawn(watchSetPasswordSaga),
];
