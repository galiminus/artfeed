export function loadJournals(payload) {
  return { type: 'LOAD_JOURNALS', payload };
}

export function resetJournals(payload) {
  return { type: 'RESET_JOURNALS', payload };
}

export function addJournals(payload) {
  return { type: 'ADD_JOURNALS', payload };
}
