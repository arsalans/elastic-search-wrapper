'use strict';

import client = require('../core/search-core');
import {validateIsUndefinedOrNull} from "../../utils/helpers";

/**
 * <pre>
 *    ****DEPRECATED, PLEASE USE /elastic/search/match or multiMatchAndFilter****
 * </pre>
 * This method performs a match search with a range filter. It can be invoked as follows:
 * <pre>
 *    http://localhost:3000/api/elastic/search/match/filter/range/shakespeare/line/text_entry/pants/speech_number/20/50?page=1&size=10
 * </pre>
 * @param index elastic search index to search
 * @param documentType document type in the index to search
 * @param field field in the index to search
 * @param term actual value of the field
 * @param rangeField range filter field
 * @param greaterThan greater than value
 * @param lessThan less than value
 * @param page page number to view
 * @param size number of results in a page
 * @returns a promised search response in json
 */
function matchAndRangeFilter(index: string, documentType: string, field: string, term: string,
                             rangeField: string, greaterThan: string, lessThan: string,
                             page: string, size: string): Promise<string> {

  validateIsUndefinedOrNull(index, "index");
  validateIsUndefinedOrNull(documentType, "documentType");
  validateIsUndefinedOrNull(field, "field");
  validateIsUndefinedOrNull(term, "term");
  validateIsUndefinedOrNull(rangeField, "rangeField");
  validateIsUndefinedOrNull(greaterThan, "greaterThan");
  validateIsUndefinedOrNull(lessThan, "lessThan");
  validateIsUndefinedOrNull(page, "page");
  validateIsUndefinedOrNull(size, "size");

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
            range: {
              [rangeField]: {
                gte: greaterThan,
                lte: lessThan
              }
            }
          }
        }
      }
    }
  };

  return client.search(searchParams);
}

module.exports = matchAndRangeFilter;
