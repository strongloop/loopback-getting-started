var loopback = require('loopback').PersistedModel;
module.exports = function(CoffeeDispatcher) {
  Coffee.find = function(ds, filter, cb) {
    var model = this.findModelForDataSource(ds);
    model.find(filter, cb);
  };

  // a modified copy of remoting metadata from loopback/lib/persisted-model.js
  // remoteMethod is 
  Coffee.remoteMethod('find', {
    isStatic: true,
    description: 'Find all instances of the model matched by filter from the data source',
    accessType: 'READ',    
    accepts: [
     {arg: 'ds', type: 'string', description: 'Name of the datasource to use' },
     {arg: 'filter', type: 'object', description: 'Filter defining fields, where, orderBy, offset, and limit'}
    ],
    returns: {arg: 'data', type: [typeName], root: true},
    http: {verb: 'get', path: '/'}
  });
  // TODO: repeat the above for all methods you want to expose this way

  Coffee.findModelForDataSource = function(ds) {
    var app = this.app;
    var ds = ds && app.dataSources[ds] || app.dataSources.default;

    var modelName = this.modelName + '-' + ds;
    var model = loopback.findModel(modelName);
    if (!model) {
      model = loopback.createModel(
        modelName, 
        {},
        { base: this.modelName });
    }
    console.log(model)
    return model;
    
  };  
};