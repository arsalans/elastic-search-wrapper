'use strict';
const client = require('../core/search-core');
const helpers_1 = require("../../utils/helpers");
/**
 * <pre>
 *    ****DEPRECATED, PLEASE USE /elastic/search/match or multiMatchAndFilter****
 * </pre>
 * This method performs a match search with a term filter. It can be invoked as follows:
 * <pre>
 *    http://localhost:3000/api/elastic/search/match/filter/term/shakespeare/line/text_entry/pants/speech_number/27?page=1&size=10
 * </pre>
 * @param index elastic search index to search
 * @param documentType document type in the index to search
 * @param field field in the index to search
 * @param term actual value of the field
 * @param termField term filter field
 * @param termQuery filter query
 * @param page page number to view
 * @param size number of results in a page
 * @returns a promised search response in json
 */
function matchAndTermFilter(index, documentType, field, term, termField, termQuery, page, size) {
    helpers_1.validateIsUndefinedOrNull(index, "index");
    helpers_1.validateIsUndefinedOrNull(documentType, "documentType");
    helpers_1.validateIsUndefinedOrNull(field, "field");
    helpers_1.validateIsUndefinedOrNull(term, "term");
    helpers_1.validateIsUndefinedOrNull(termField, "termField");
    helpers_1.validateIsUndefinedOrNull(termQuery, "termQuery");
    helpers_1.validateIsUndefinedOrNull(page, "page");
    helpers_1.validateIsUndefinedOrNull(size, "size");
    let searchParams = {
        index: index,
        type: documentType,
        from: (Number.parseInt(page) - 1) * Number.parseInt(size),
        size: size,
        body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                [field]: term
                            }
                        }
                    ],
                    filter: {
                        term: {
                            [termField]: termQuery
                        }
                    }
                }
            }
        }
    };
    return client.search(searchParams);
}
module.exports = matchAndTermFilter;
//# sourceMappingURL=search-match-filter-term.js.map