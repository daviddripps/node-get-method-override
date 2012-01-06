module.exports = function(req, res, next)
{
    //if it's a GET request but should be overrode via the _method param
    if(req.query._method && req.query._method.toLowerCase() != 'get' && req.method.toLowerCase() == 'get')
    {
        req.method = req.query._method;
        req.body = req.query;
        try { delete req.body._method; } catch(ignore) {}
    }
    
    next();
}
