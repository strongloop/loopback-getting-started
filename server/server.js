var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

app.use('/express-status', function(req, res, next) {
  res.json({ running: true });
});

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}
