'use strict';

import client = require('../core/search-core');
import {validateIsUndefinedOrNull} from "../../utils/helpers";

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
function matchAndTermFilter(index: string, documentType: string, field: string, term: string,
                            termField: string, termQuery: string,
                            page: string, size: string): Promise<string> {

  validateIsUndefinedOrNull(index, "index");
  validateIsUndefinedOrNull(documentType, "documentType");
  validateIsUndefinedOrNull(field, "field");
  validateIsUndefinedOrNull(term, "term");
  validateIsUndefinedOrNull(termField, "termField");
  validateIsUndefinedOrNull(termQuery, "termQuery");
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
