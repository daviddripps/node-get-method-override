# GET methodOverride

A method override similar to express.methodOverride, but for GET requests instead of POST requests.  This is incredibly useful when building client-side widgets that must interact with your API via XHR and JSONP requests.

``` bash
npm install get-methodoverride
```

## Usage

After installing the NPM package we need to add it to Express.  In Express's ```app.configure``` block add ```app.use(require('get-methodoverride'));``` as seen below.

``` javascript
app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    
    /* Add GET methodOverride AFTER express.methodOverride() and BEFORE app.router */
    app.use(require('get-methodoverride'));
    
    app.use(app.router);
})

```

Now, simply add the ```_method``` parameter to your request query as you would to the request body in the traditional methodOverride and your request will be properly routed.

## Test

To run the tests, simply cd to the node-get-method-override directory and type the following
```
npm install -d
make test
```
