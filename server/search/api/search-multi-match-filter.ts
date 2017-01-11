'use strict';

import client = require('../core/search-core');
import {validateIsUndefinedOrNull} from "../../utils/helpers";
import {generateElasticDSLQuery} from "../core/dsl-generator";

/**
 * This method handles multiple query parameters with term and range filter combined.
 * It is not necessary to provide all the data below, however it is necessary to send all the keys (like index, type, match, filter etc).
 * <pre>
 *     http://localhost:3000/api/elastic/search/match
 *     {
 *        "index": "shakespeare",
 *        "type": "line",
 *        "page": "1",
 *        "size": "20",
 *        "match": [{
 *            "text_entry": "pants"
 *        },
 *        {
 *            "text_entry": "ride"
 *        }],
 *        "filter": [{
 *            "speech_number": "1"
 *        },
 *        {
 *            "play_name": "Antony and Cleopatra"
 *        }],
 *        "filterRange": {
 *            "line_id": {
 *                "lte": "22300",
 *                "gte": "21000"
 *            }
 *        }
 *     }
 * </pre>
 *     Or minimally, you can call this api like this:
 * <pre>
 *     http://localhost:3000/api/elastic/search/match
 *     {
 *        "index": "shakespeare",
 *        "type": "line",
 *        "page": "1",
 *        "size": "20",
 *        "match": [{
 *            "text_entry": "pants"
 *        }],
 *        "filter": [],
 *        "filterRange": {}
 *     }
 * </pre>
 * @param body that should be called as described above
 * @returns a promised search response in json
 * @author Arsalan Siddiqui
 */
function multiMatchAndFilter(body): Promise<string> {
  validateIsUndefinedOrNull(body.index, "body.index");
  validateIsUndefinedOrNull(body.type, "body.type");
  validateIsUndefinedOrNull(body.page, "body.page");
  validateIsUndefinedOrNull(body.size, "body.size");
  validateIsUndefinedOrNull(body.match, "body.match");
  validateIsUndefinedOrNull(body.filter, "body.filter");
  validateIsUndefinedOrNull(body.filterRange, "body.filterRange");

  let elasticQueryDSL = generateElasticDSLQuery(body);

  let searchParams = {
    index: body.index,
    from: (body.page - 1) * body.size,
    size: body.size,
    body: elasticQueryDSL
  };

  return client.search(searchParams);
}

module.exports = multiMatchAndFilter;
