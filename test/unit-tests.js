var assert = require('assert');
var sequelize = exports.sequelize = require('../conn.js');
var Employee = require('../models/employees.js');

describe('Employees Tests', function() {

  it('should create an employee', function(done) {
    Employee
      .create({email: 'none@none.com'})
      .then(function(record){
        assert.ok(record.get('email') === 'none@none.com', 'Email does not match');
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });
});
