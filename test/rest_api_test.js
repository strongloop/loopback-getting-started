/* jshint camelcase: false */
var app = require('../server/server');
var request = require('supertest');
var assert = require('assert');
var loopback = require('loopback');

function json(verb, url) {
    return request(app)[verb](url)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
  }

describe('REST API request', function() {

  before(function(done) {
    require('./start-server');
    done();
  });
  

  after(function(done) {
    app.removeAllListeners('started');
    app.removeAllListeners('loaded');
    done();
  });
  
  it('should return a list of all coffee shops', function(done) {
    json('get', '/api/CoffeeShops')
      .expect(200)
      .end(function(err, res) {
        assert(Array.isArray(res.body));
        assert(res.body.length);
        done();
      });
  });

  var coffeeShopId;
  it('should create a new coffee shop', function(done){
    json('post', '/api/CoffeeShops')
      .send({
        name: 'Blue Bottle Coffee',
        city: 'San Mateo'
      })
      .expect(200)
      .end(function(err, res){
        assert(typeof res.body === 'object');
        assert(res.body.id, 'must have an id');
        coffeeShopId = res.body.id;
        done();
      });
  });

  it('should update the coffee with the given Id', function(done){
    json('put', '/api/CoffeeShops/' + coffeeShopId)
      .send({
        city: 'San Francisco'
      })
      .expect(200, function(err, res){
        var updatedCoffeeShop = res.body;
        assert(updatedCoffeeShop);
        assert(updatedCoffeeShop.id);
        assert.equal(updatedCoffeeShop.id, coffeeShopId);
        assert.equal(updatedCoffeeShop.city, 'San Francisco');
        json('get', '/api/CoffeeShops/' + coffeeShopId)
          .expect(200, function(err, res){
            var foundCoffeeShop = res.body;
            assert.equal(foundCoffeeShop.id, coffeeShopId);
            assert.equal(foundCoffeeShop.city, 'San Francisco');
            done();
          });
      });
  });
});

describe('Unexpected Usage', function(){
  it('should not crash the server when posting a bad id', function(done){
    json('post', '/api/CoffeeShops/foobar')
      .send({})
      .expect(404, done);
  });
});

 

