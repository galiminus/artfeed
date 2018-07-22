import { delay } from 'redux-saga';
import { put, takeEvery, call } from 'redux-saga/effects';
import api from '../api';
import { Toast } from 'native-base';

function* sendAuthorBlacklist({ payload }) {
  try {
    while (true) {
      const response = yield api.sendAuthorBlacklist(payload);

      if (response.ok) {
        Toast.show({
          text: 'Opt-out request sent',
          buttonText: 'Okay'
        });
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

function* watchSendAuthorBlacklist() {
  yield takeEvery('SEND_AUTHOR_BLACKLIST', sendAuthorBlacklist);
}

export default watchSendAuthorBlacklist;
