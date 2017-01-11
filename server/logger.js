/**
 * Created by arsal on 2017-01-05.
 */
var winston = require('winston');

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'elastic-search.log' })
  ]
});

module.exports = logger;
