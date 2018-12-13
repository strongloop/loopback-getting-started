const app = require('../../server/server');


module.exports = function(CoffeeDispatcher) {
  app.once('ready', () => defineRemoteApi);

  CoffeeDispatcher.find = function(ds, filter, cb) {
    var model = this.findModelForDataSource(ds);
    model.find(filter, cb);
  };

  function defineRemoteApi() {
    const Coffee = app.models.Coffee;

    // a modified copy of remoting metadata from loopback/lib/persisted-model.js
    // remoteMethod is
    CoffeeDispatcher.remoteMethod('find', {
      isStatic: true,
      description: 'Find all instances of the model matched by filter from the data source',
      accessType: 'READ',
      accepts: [
       {arg: 'ds', type: 'string', description: 'Name of the datasource to use' },
       {arg: 'filter', type: 'object', description: 'Filter defining fields, where, orderBy, offset, and limit'}
      ],
      returns: {arg: 'data', type: [Coffee], root: true},
      http: {verb: 'get', path: '/'}
    });
    // TODO: repeat the above for all methods you want to expose this way
  }

  CoffeeDispatcher.findModelForDataSource = function(ds) {
    var app = this.app;
    var ds = ds && app.dataSources[ds] || app.dataSources.default;

    var modelName = this.modelName + '-' + ds;
    var model = app.registry.findModel(modelName);
    if (!model) {
      model = app.registry.createModel(
        modelName,
        {},
        { base: Coffee.modelName });
    }
    console.log(model)
    return model;
  };
};
