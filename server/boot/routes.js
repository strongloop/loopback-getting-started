// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-getting-started
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  // Install a "/ping" route that returns "pong"
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
};
