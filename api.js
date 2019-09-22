import Constants from 'expo-constants';
import { create } from 'apisauce'

const api = create({
 baseURL: Constants.manifest.extra.apiUrl,
  // baseURL: "http://192.168.0.28:3000",
  headers: {
    'Accept': 'application/json'
  }
})

const get = (path, params, token) =>
  api.get(`${path}.json`, params, {
    headers: {
      'Content-Type': 'application/json'
    },
  })

const put = (path, params, token) =>
  api.put(`${path}.json`, params, {
    headers: {
      'Content-Type': 'application/json'
    },
  })

export default {
  loadJournals(params) {
    return (
      api.get(`/journals.json`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },
  sendAuthorBlacklist(params) {
    return (
      api.put(`/author_blacklists/send_message.json`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },
  loadSubscriptions(params) {
    return (
      api.get(`/subscriptions.json`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },
  addSubscription(subscription) {
    return (
      api.post(`/subscriptions.json`, { subscription }, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },
  removeSubscription(params) {
    return (
      api.delete(`/subscriptions/${params.expo_token}:${params.author_slug}.json`, params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  }
};
