'use strict';
const client = require('../core/search-core');
const helpers_1 = require("../../utils/helpers");
/**
 * This method performs an exact match search against a given index. It can be invoked as follows:
 * http://localhost:3000/api/elastic/search/match/shakespeare/line/text_entry/pants?page=1&size=10
 * @param index elastic search index to search
 * @param documentType elastic search document type to search
 * @param field field in the index to search
 * @param term value of the field which we need to find
 * @param page page number to view
 * @param size number of results to see in a page
 * @returns a promised search response in json
 * @author Arsalan Siddiqui
 */
function matchQuery(index, documentType, field, term, page, size) {
    helpers_1.validateIsUndefinedOrNull(index, "index");
    helpers_1.validateIsUndefinedOrNull(documentType, "documentType");
    helpers_1.validateIsUndefinedOrNull(field, "field");
    helpers_1.validateIsUndefinedOrNull(term, "term");
    helpers_1.validateIsUndefinedOrNull(page, "page");
    helpers_1.validateIsUndefinedOrNull(size, "size");
    let searchParams = {
        index: index,
        type: documentType,
        from: (Number.parseInt(page) - 1) * Number.parseInt(size),
        size: size,
        body: {
            query: {
                match: {
                    [field]: term
                }
            }
        }
    };
    return client.search(searchParams);
}
module.exports = matchQuery;
//# sourceMappingURL=search-match.js.map