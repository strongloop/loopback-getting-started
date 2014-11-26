// Copyright IBM Corp. 2014. All Rights Reserved.
// Node module: loopback-getting-started
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

module.exports = function(app) {
  app.dataSources.mysqlDs.automigrate('CoffeeShop', function(err) {
    if (err) throw err;

    app.models.CoffeeShop.create([
      {name: 'Bel Cafe', city: 'Vancouver'},
      {name: 'Three Bees Coffee House', city: 'San Mateo'},
      {name: 'Caffe Artigiano', city: 'Vancouver'},
    ], function(err, coffeeShops) {
      if (err) throw err;

      console.log('Models created: \n', coffeeShops);
    });
  });
};
