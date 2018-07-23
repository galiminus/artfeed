export default function(state = [], action) {
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS':
      return action.payload;
    case 'ADD_SUBSCRIPTION':
      return [
        action.payload.author_slug.toLowerCase(),
        ...state
      ];
    case 'REMOVE_SUBSCRIPTION':
      return state.filter((subscription) => subscription !== action.payload.author_slug.toLowerCase())
    default:
      return state;
  }
}
