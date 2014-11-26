// Copyright IBM Corp. 2014,2015. All Rights Reserved.
// Node module: loopback-getting-started
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);
};
