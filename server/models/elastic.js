let logger = require("../logger");
let ping = require('../search/api/search-ping');
let match = require('../search/api/search-match');
let matchPhrase = require('../search/api/search-match-phrase');
let multiMatchAndFilter = require('../search/api/search-multi-match-filter');

module.exports = function (elastic) {

  elastic.ping = function (body, cb) {
    let promise = ping(body);
    displayResults(promise, cb);
  };

  elastic.remoteMethod('ping', {
    accepts: [
      {arg: 'index', type: 'string'},
    ],
    returns: {arg: 'result', type: 'string'},
    http: {path: '/ping', verb: 'get'}
  });

  elastic.match = function (index, type, field, term, page, size, cb) {
    let promise = match(index, type, field, term, page, size);
    displayResults(promise, cb);
  };

  elastic.remoteMethod('match', {
    accepts: [
      {arg: 'index', type: 'string'},
      {arg: 'type', type: 'string'},
      {arg: 'field', type: 'string'},
      {arg: 'term', type: 'string'},
      {arg: 'page', type: 'string'},
      {arg: 'size', type: 'string'}
    ],
    returns: {arg: 'result', type: 'string'},
    http: {path: '/search/match/:index/:type/:field/:term', verb: 'get'}
  });

  elastic.matchPhrase = function (index, type, field, phrase, page, size, cb) {
    let promise = matchPhrase(index, type, field, phrase, page, size);
    displayResults(promise, cb);
  };

  elastic.remoteMethod('matchPhrase', {
    accepts: [
      {arg: 'index', type: 'string'},
      {arg: 'type', type: 'string'},
      {arg: 'field', type: 'string'},
      {arg: 'phrase', type: 'string'},
      {arg: 'page', type: 'string'},
      {arg: 'size', type: 'string'}
    ],
    returns: {arg: 'result', type: 'string'},
    http: {path: '/search/match/phrase/:index/:type/:field/:phrase', verb: 'get'}
  });

  elastic.multiMatchAndFilter = function (body, cb) {
    let promise = multiMatchAndFilter(body);
    displayResults(promise, cb);
  };

  elastic.remoteMethod('multiMatchAndFilter', {
    accepts: [
      {arg: 'searchBody', type: 'object', http: {source: 'body'}}
    ],
    returns: {arg: 'result', type: 'string'},
    http: {path: '/search/match', verb: 'post'}
  });

  function displayResults(promise, cb) {
    promise
      .then(function (response) {
        if (response.hits) {
          cb(null, response.hits.hits);
        }
        else {
          cb(null, response);
        }
      })
      .catch(function (error) {
        logger.error("Error resolving elastic search promise", error);
        cb(null, error.message);
      });
  }
};

