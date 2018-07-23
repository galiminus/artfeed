export default function(state = [], action) {
  switch (action.type) {
    case 'SET_SUBSCRIPTIONS':
      return action.payload;
    case 'ADD_SUBSCRIPTION':
      const author_slug = action.payload.author_slug.toLowerCase();
      if (state.indexOf(author_slug) > -1) {
        return state;
      }
      return [
        author_slug,
        ...state
      ];
    case 'REMOVE_SUBSCRIPTION':
      return state.filter((subscription) => subscription !== action.payload.author_slug.toLowerCase())
    default:
      return state;
  }
}
