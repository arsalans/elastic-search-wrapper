'use strict';

import client = require('../core/search-core');

/**
 * This method just pings elastic search and returns true if its up.
 * @returns a promised true if up otherwise an error
 */
function ping() {
  return client.ping({
    // ping usually has a 3000ms timeout
    requestTimeout: 3000,
  });
}

module.exports = ping;

