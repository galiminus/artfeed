import { all, fork } from 'redux-saga/effects';

import watchLoadJournals from './watchLoadJournals';
import watchLoadSubscriptions from './watchLoadSubscriptions';
import watchSendAuthorBlacklist from './watchSendAuthorBlacklist';
import watchAddSubscription from './watchAddSubscription';
import watchRemoveSubscription from './watchRemoveSubscription';

export default function* rootSaga() {
  yield all([
    fork(watchLoadJournals),
    fork(watchSendAuthorBlacklist),
    fork(watchAddSubscription),
    fork(watchRemoveSubscription),
    fork(watchLoadSubscriptions),
  ]);
}
