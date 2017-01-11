import {isEmpty} from "../../utils/helpers";

/**
 * This is the main method that generates the elastic query for multi match/filter conditions.
 * @param body
 * @returns {{query: {bool: {must: any, filter: any}}}}
 */
export function generateElasticDSLQuery(body): Object {
  let matchJson = generateMatchConditions(body.match);
  let filterJson = generateFilterConditions(body.filter, body.filterRange);

  return {
    query: {
      bool: {
        must: matchJson,
        filter: filterJson
      }
    }
  };

  function generateMatchConditions(match) {
    let matchConditions = "[";
    for (let i = 0, length = match.length; i < length; i++) {
      matchConditions += "{ \"match\" : ";
      matchConditions += JSON.stringify(match[i]);
      matchConditions += "}";

      if (i < length - 1) {
        matchConditions += ",";
      }
    }
    return JSON.parse(matchConditions + "]");
  }

  function generateFilterConditions(filter, filterRange) {
    let termFilterConditions = generateTermFilterConditions(filter);
    let rangeFilterConditions = generateRangeFilterConditions(filterRange);
    let finalFilterConditions = "[";

    if (!isEmpty(termFilterConditions)) {
      finalFilterConditions += termFilterConditions;
    }

    if (!isEmpty(rangeFilterConditions)) {
      //put a comma after if termFilterConditions were not empty
      if (!isEmpty(termFilterConditions)) {
        finalFilterConditions += ",";
        finalFilterConditions += rangeFilterConditions;
      }
      else {
        finalFilterConditions += rangeFilterConditions;
      }
    }
    finalFilterConditions += "]";

    return JSON.parse(finalFilterConditions);
  }

  function generateTermFilterConditions(filter) {
    let filterConditions = "";
    for (let i = 0, length = filter.length; i < length; i++) {
      filterConditions += "{ \"term\" : ";
      filterConditions += JSON.stringify(filter[i]);
      filterConditions += "}";

      if (i < length - 1) {
        filterConditions += ",";
      }
    }
    return filterConditions;
  }

  function generateRangeFilterConditions(filterRange) {
    let rangeFilterConditions = "";
    if (Object.keys(filterRange).length > 0) {
      rangeFilterConditions = "{ \"range\" :";
      rangeFilterConditions += JSON.stringify(filterRange);
      rangeFilterConditions += "}";
    }
    return rangeFilterConditions;
  }
}
