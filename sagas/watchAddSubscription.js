import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { showSubscriptionsRefresh, hideSubscriptionsRefresh } from '../actions/subscriptionsRefresh';
import api from '../api';
import getExpoToken from '../getExpoToken';
import { setExpoToken } from '../actions/expoToken';

function* addSubscription({ payload }) {
  try {
    yield put(showSubscriptionsRefresh());
    const expoToken = yield getExpoToken();
    if (!expoToken) {
      return;
    }
    yield put(setExpoToken(expoToken))

    while (true) {
      const response = yield api.addSubscription({ expo_token: expoToken, ...payload });
      if (response.ok) {
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

function* watchAddSubscription() {
  yield takeEvery('ADD_SUBSCRIPTION', addSubscription);
}

export default watchAddSubscription;
