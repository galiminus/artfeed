export default function(state = false, action) {
  switch (action.type) {
    case 'SHOW_SUBSCRIPTIONS_REFRESH':
      return true;
    case 'HIDE_SUBSCRIPTIONS_REFRESH':
      return false;
    default:
      return state;
  }
}
