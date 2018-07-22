import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import { addJournals, resetJournals } from '../actions/journals';
import { showJournalsRefresh, hideJournalsRefresh } from '../actions/journalsRefresh';
import api from '../api';

function* loadJournals({ payload }) {
  try {
    yield put(showJournalsRefresh());
    while (true) {
      const response = yield api.loadJournals(payload);

      if (response.ok) {
        if (payload.page === 1) {
          yield put(resetJournals({ kind: payload.kind }));
        }
        yield put(addJournals({ journals: response.data, kind: payload.kind }));
        yield put(hideJournalsRefresh());
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

function* watchLoadJournals() {
  yield takeEvery('LOAD_JOURNALS', loadJournals);
}

export default watchLoadJournals;
