/**
 * GET methodOverride for NodeJS
 *
 * @author David Dripps <david.dripps@gmail.com>
 * @created 01/05/2012
 */

(function() {
  var helper = {
    /**
     * determines whether the GET request should be overrode to act as the _method param
     *
     * @param {HTTPRequest} req
     * @returns {Boolean}
     */
    shouldOverride: function(req) {
      return !!(typeof req != 'undefined'
          && req.query
          && req.query._method
          && req.query._method.toLowerCase() != 'get'
          && req.method
          && req.method.toLowerCase() == 'get');
    },

    /**
     * replaces the GET method with the request method from the _method query parameter.
     * moves the request query into the request body since that's where all other HTTP
     * verbs expect the data to be delivered.
     * deletes the _method parameter from the new request body
     *
     * @param {HTTPRequest} req
     * @return {HTTPRequest}
     */
    overrideMethod: function(req) {
      req.method = req.query._method;
      req.body = req.query;

      try { delete req.body._method; } catch(ignore) {}

      return req;
    }
  };


  module.exports = function(req, res, next) {
    if(helper.shouldOverride(req)) {
      helper.overrideMethod(req);
    }

    next();
  };

  //this is just here to make testing easy
  module.exports.helper = helper;
}());