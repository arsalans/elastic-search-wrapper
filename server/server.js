'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
// var searchGet = require('./search/api/search-get');
// var searchMatch = require('./search/api/search-match');
// var searchMatchPhrase = require('./search/api/search-match-phrase');
// var searchMatchFilterTerm = require('./search/api/search-match-filter-term');
// var searchMatchFilterRange = require('./search/api/search-match-filter-range');

var app = module.exports = loopback();
// app.use('/search/get', searchGet);
// app.use('/search/match', searchMatch);
// app.use('/search/match/phrase', searchMatchPhrase);
// app.use('/search/match/filter/term', searchMatchFilterTerm);
// app.use('/search/match/filter/range', searchMatchFilterRange);

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
