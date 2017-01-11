'use strict';

let elasticsearch = require('elasticsearch');
//import messageConsumer = require('../insertInDbAndElastic/queue/message-consumer');
//import messageProducer = require('../insertInDbAndElastic/queue/message-producer');

/**
 * Initializes elastic search client against a particular elastic search server
 * @function initializeElasticSearchClient
 * @returns {Object} returns the elastic search client
 */

function initializeElasticSearchClient() {
  let client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });
  return client;
}

export = initializeElasticSearchClient();

//export {initializeElasticSearchClient};
//module.exports = initializeElasticSearchClient();


