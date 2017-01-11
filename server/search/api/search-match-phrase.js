'use strict';
const client = require('../core/search-core');
const helpers_1 = require("../../utils/helpers");
/**
 * This method searches a phrase in a given elastic search index. It can be invoked as follows:
 * http://localhost:3000/api/elastic/search/match/phrase/shakespeare/text_entry/ride on a bay?page=1&size=10
 * @param index elastic search index to search
 * @param documentType elastic search document type to search
 * @param field field in the index to search
 * @param phrase a phrase which we need to find in the field given above
 * @param page page number to view
 * @param size number of results to see in a page
 * @returns a promised search response in json
 * @author Arsalan Siddiqui
 */
function matchPhrase(index, documentType, field, phrase, page, size) {
    helpers_1.validateIsUndefinedOrNull(index, "index");
    helpers_1.validateIsUndefinedOrNull(documentType, "documentType");
    helpers_1.validateIsUndefinedOrNull(field, "field");
    helpers_1.validateIsUndefinedOrNull(phrase, "phrase");
    helpers_1.validateIsUndefinedOrNull(page, "page");
    helpers_1.validateIsUndefinedOrNull(size, "size");
    let searchParams = {
        index: index,
        type: documentType,
        from: (Number.parseInt(page) - 1) * Number.parseInt(size),
        size: size,
        body: {
            query: {
                match_phrase: {
                    [field]: phrase
                }
            }
        }
    };
    return client.search(searchParams);
}
module.exports = matchPhrase;
//# sourceMappingURL=search-match-phrase.js.map