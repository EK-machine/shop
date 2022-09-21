import { all } from 'redux-saga/effects';
import { productsSaga } from './productsSaga';
import { usersSaga } from './usersSaga';
import { cartSaga } from './cartSaga';
import { likedSaga } from './likedSaga';
import { ordersSaga } from './ordersSaga';

export default function* rootSaga() {
  yield all([...productsSaga, ...usersSaga, ...cartSaga, ...likedSaga, ...ordersSaga]);
}
