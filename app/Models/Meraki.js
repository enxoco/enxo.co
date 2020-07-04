'use strict';
var axios = require('axios');

const ERRORS = {
  INVALID_API_KEY: 'Invalid API Key specified!'
};

function MerakiDashboard(apiKey) {
  if (typeof apiKey !== 'string' || apiKey.length === 0) {
    throw new Error(ERRORS.INVALID_API_KEY);
  }

  var dashboard = {};

  var rest = {
    client: axios.create({
      baseURL: 'https://dashboard.meraki.com/api/v0/',
      headers: {
        'X-Cisco-Meraki-API-Key': apiKey,
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json'
      }
    }),
    get: function(url, parameters) {
      return this.client.get(url, { params: parameters !== undefined ? parameters : {} })
          .then(response => response.data)
          .catch(response => Promise.reject(response.response));
    },
    post: function(url, parameters) {
      return this.client.post(url, parameters !== undefined ? parameters : {})
          .then(response => response.data)
          .catch(response => Promise.reject(response.response));
    },
    put: function(url, parameters) {
      return this.client.put(url, parameters !== undefined ? parameters : {})
          .then(response => response.data)
          .catch(response => Promise.reject(response.response));
    },
    delete: function(url) {
      this.client.delete(url)
          .then(response => response.data)
          .catch(response => Promise.reject(response.response));
    }
  };


  dashboard.sm = {
    userDevices: (network_id, email) => rest.get(`/networks/${network_id}/sm/devices?fields=tags&scope=withAll,${email}&fields=isSupervised`),
    listDevices: (network_id) => rest.get(`/networks/${network_id}/sm/devices`),
    editTags: (network_id, params) => rest.put(`/networks/${network_id}/sm/devices/tags`, params),
    editFields: (network_id, params) => rest.put(`/networks/${network_id}/sm/device/fields`, params),
    lockDevices: (network_id, params) => rest.put(`/networks/${network_id}/sm/devices/lock`, params),
    wipeDevice: (network_id, params) => rest.put(`/networks/${network_id}/sm/device/wipe`, params),
    forceCheckInDevices: (network_id, params) => rest.put(`/networks/${network_id}/sm/devices/checkin`, params),
    moveDevices: (network_id, params) => rest.put(`/networks/${network_id}/sm/devices/move`, params)
  };

  return dashboard;
}

module.exports = MerakiDashboard;
