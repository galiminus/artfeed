export function removeSubscription(payload) {
  return { type: 'REMOVE_SUBSCRIPTION', payload };
}

export function addSubscription(payload) {
  return { type: 'ADD_SUBSCRIPTION', payload };
}
