import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import journals from './reducers/journals';
import journalsRefresh from './reducers/journalsRefresh';
import subscriptions from './reducers/subscriptions';
import subscriptionsRefresh from './reducers/subscriptionsRefresh';

export default combineReducers({
  journals,
  journalsRefresh,
  subscriptions,
  subscriptionsRefresh,
  form: formReducer,
});
