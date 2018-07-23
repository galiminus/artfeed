export function removeSubscription(payload) {
  return { type: 'REMOVE_SUBSCRIPTION', payload };
}

export function addSubscription(payload) {
  return { type: 'ADD_SUBSCRIPTION', payload };
}

export function setSubscriptions(payload) {
  return { type: 'SET_SUBSCRIPTIONS', payload };
}

export function loadSubscriptions(payload) {
  return { type: 'LOAD_SUBSCRIPTIONS', payload };
}
