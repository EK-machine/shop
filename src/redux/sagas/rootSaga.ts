import { all } from 'redux-saga/effects';
import { usersSaga } from './usersSaga';
import { cartSaga } from './cartSaga';
import { likedSaga } from './likedSaga';

export default function* rootSaga() {
  yield all([...usersSaga, ...cartSaga, ...likedSaga]);
}
