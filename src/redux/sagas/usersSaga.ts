import { takeEvery, put, call, fork, SagaReturnType } from 'redux-saga/effects';
import { getUsersRequest, getUsersSuccess, getUsersFailed } from '../slices/userSlice';
import { apiGetUsers } from '../../api/apis';

export function* workerGetUsersSaga() {
  try {
    const users: SagaReturnType<typeof apiGetUsers> = yield call(apiGetUsers);
    console.log(users);
    yield put({ type: getUsersSuccess.type, payload: users });
  } catch (e) {
    yield put({
      type: getUsersFailed.type,
      payload: {
        userError: (e as { userError: string }).userError,
      },
    });
  }
}

// export function* workerGetUserSaga(action: { type: typeof getUserRequest.type; payload: string }) {
//   try {
//     const user: SagaReturnType<typeof apiGetUser> = yield call(apiGetUser, action.payload);
//     yield put({ type: getUserSuccess.type, payload: user[0] });
//   } catch (e) {
//     yield put({
//       type: getUserFailed.type,
//       payload: {
//         message: (e as { message: string }).message,
//       },
//     });
//   }
// }

export function* watchUserSaga() {
  yield takeEvery(getUsersRequest.type, workerGetUsersSaga);
}

export const usersSaga = [fork(watchUserSaga)];
