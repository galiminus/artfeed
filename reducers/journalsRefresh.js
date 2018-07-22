export default function(state = false, action) {
  switch (action.type) {
    case 'SHOW_JOURNALS_REFRESH':
      return true;
    case 'HIDE_JOURNALS_REFRESH':
      return false;
    default:
      return state;
  }
}
