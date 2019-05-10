// Copyright IBM Corp. 2014,2019. All Rights Reserved.
// Node module: loopback-getting-started

'use strict';

module.exports = async function(app) {
  await app.dataSources.mysqlDs.automigrate('CoffeeShop');
  const coffeeShops = await app.models.CoffeeShop.create([{
    name: 'Bel Cafe',
    city: 'Vancouver',
  }, {
    name: 'Three Bees Coffee House',
    city: 'San Mateo',
  }, {
    name: 'Caffe Artigiano',
    city: 'Vancouver',
  },
  ]);

  console.log('Models created: \n', coffeeShops);
};
