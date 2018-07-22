export default function(state = { raffles: [], commissions: [] }, action) {
  switch (action.type) {
    case 'RESET_JOURNALS':
      return {
        ...state,
        [action.payload.kind]: []
      };
    case 'ADD_JOURNALS':
      return {
        ...state,
        [action.payload.kind]: [ ...state[action.payload.kind], ...action.payload.journals ]
      }
    default:
      return state;
  }
}
