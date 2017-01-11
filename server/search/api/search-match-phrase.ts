'use strict';

import client = require('../core/search-core');
import {validateIsUndefinedOrNull} from "../../utils/helpers";

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
function matchPhrase(index: string, documentType: string, field: string, phrase: string,
                     page: string, size: string): Promise<string> {

  validateIsUndefinedOrNull(index, "index");
  validateIsUndefinedOrNull(documentType, "documentType");
  validateIsUndefinedOrNull(field, "field");
  validateIsUndefinedOrNull(phrase, "phrase");
  validateIsUndefinedOrNull(page, "page");
  validateIsUndefinedOrNull(size, "size");

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
