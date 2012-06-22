require('should');

var methodOverride = require('../index.js');

suite('methodOverride', function() {
  setup(function() {
    this.methodOverride = methodOverride;
    this.nextFunction = (function() {
      function stubFn() {
        stubFn.called = true;
      }

      stubFn.called = false;

      return stubFn;
    }());
  });
  teardown(function() {
    methodOverride = this.methodOverride;
  });
  test('should be a function', function() {
    this.methodOverride.should.be.a('function');
  });
  test('should call next when complete', function() {
    this.methodOverride({}, {}, this.nextFunction);

    this.nextFunction.called.should.be.true;
  });
});

suite('methodOverride.helper', function() {
  setup(function() {
    //get a copy to revert in teardown
    this.methodOverride = methodOverride;
    //get an array of the methods of helper
    this.methods = [];
    for(var i in this.methodOverride.helper) this.methods.push(i);
  });
  teardown(function() {
    methodOverride = this.methodOverride;
  });
  test('should be an object', function() {
    this.methodOverride.helper.should.be.a('object');
  });
  test('should have a length of 2', function() {
    this.methods.length.should.equal(2);
  });
  test('should have a "shouldOverride" function as a key', function() {
    this.methods.indexOf('shouldOverride').should.not.equal(-1);
  });
  test('should have a "overrideMethod" function as a key', function() {
    this.methods.indexOf('overrideMethod').should.not.equal(-1);
  });
});

suite('methodOverride.helper.shouldOverride', function() {
  setup(function() {
    this.methodOverride = methodOverride;
    this.shouldOverride = this.methodOverride.helper.shouldOverride;
    this.request = {
      method: 'GET',
      query: {
        _method: 'POST'
      },
      body: {}
    }
  });
  teardown(function() {
    methodOverride = this.methodOverride;
  });
  test('should return true if method is GET and a different _method is provided', function() {
    var result = this.shouldOverride(this.request);

    result.should.be.true;
  });
  test('should return false if method is not GET', function() {
    this.request.method = 'POST';

    var result = this.shouldOverride(this.request);

    result.should.be.false;
  });
  test('should return false if no _method query parameter is provided', function() {
    delete this.request.query._method;
    this.request.query.should.not.have.key('_method');

    var result = this.shouldOverride(this.request);

    result.should.be.false;
  });
  test('should return false if the _method query parameter equals GET', function() {
    this.request.query._method = 'GET';

    var result = this.shouldOverride(this.request);

    result.should.be.false;
  });
  test('should return false if no request is provided', function() {
    var result = this.shouldOverride();

    result.should.be.false;
  });
  test('should return false if request is an empty object', function() {
    var result = this.shouldOverride({});

    result.should.be.false;
  });
});