'use strict';
const client = require('../core/search-core');
const helpers_1 = require("../../utils/helpers");
const dsl_generator_1 = require("../core/dsl-generator");
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
function multiMatchAndFilter(body) {
    helpers_1.validateIsUndefinedOrNull(body.index, "body.index");
    helpers_1.validateIsUndefinedOrNull(body.type, "body.type");
    helpers_1.validateIsUndefinedOrNull(body.page, "body.page");
    helpers_1.validateIsUndefinedOrNull(body.size, "body.size");
    helpers_1.validateIsUndefinedOrNull(body.match, "body.match");
    helpers_1.validateIsUndefinedOrNull(body.filter, "body.filter");
    helpers_1.validateIsUndefinedOrNull(body.filterRange, "body.filterRange");
    let elasticQueryDSL = dsl_generator_1.generateElasticDSLQuery(body);
    let searchParams = {
        index: body.index,
        from: (body.page - 1) * body.size,
        size: body.size,
        body: elasticQueryDSL
    };
    return client.search(searchParams);
}
module.exports = multiMatchAndFilter;
//# sourceMappingURL=search-multi-match-filter.js.map