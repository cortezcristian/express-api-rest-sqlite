var assert = require('assert');
var superagent = require('superagent');
var d = "http://localhost:3000";
var agent;

describe("REST API", function(){

  before(function(){
    // Start agent
    agent = superagent.agent();
  });

  it('GET /employess', function(done){
    agent
      .get(d+'/employees')
      .end(function(err, res) {
        assert.ok(res.ok);
        assert.ok(res.body.length>0);
        done(err);
      });
  });

});
