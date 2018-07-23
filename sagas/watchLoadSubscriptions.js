import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { setSubscriptions } from '../actions/subscriptions';
import { showSubscriptionsRefresh, hideSubscriptionsRefresh } from '../actions/subscriptionsRefresh';
import api from '../api';

function* loadSubscriptions({ payload }) {
  try {
    yield put(showSubscriptionsRefresh());
    while (true) {
      const response = yield api.loadSubscriptions(payload);
      if (response.ok) {
        yield put(setSubscriptions(response.data));
        yield put(hideSubscriptionsRefresh());
        return ;
      } else if (response.problem !== 'CLIENT_ERROR') {
        yield call(delay, 3000);
      } else {
        return ;
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* watchLoadSubscriptions() {
  yield takeEvery('LOAD_SUBSCRIPTIONS', loadSubscriptions);
}

export default watchLoadSubscriptions;
