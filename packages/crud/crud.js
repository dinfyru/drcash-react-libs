import compact from 'lodash.compact';
import queryBuilder from 'query-string';
import cloneDeep from 'lodash.clonedeep';

// crud types
export const CRUD_ACTION_REQUEST = 'CRUD_ACTION_REQUEST';
export const CRUD_ACTION_SUCCESS = 'CRUD_ACTION_SUCCESS';
export const CRUD_ACTION_FAILURE = 'CRUD_ACTION_FAILURE';
const RSAA = '@@redux-api-middleware/RSAA';

/**
 * Easy request to api server
 * @async
 * @param {Object} params
 * @param {string} [params.method=GET]
 * @param {string} params.endpoint
 * @param {Object} params.keys
 * @param {Object} query
 * @param {Object|Object[]} params.body
 * @param {Object} params.meta
 * @param {string} [params.name=base_]
 * @param {Object} params.headers
 * @returns {Promise} request result
 */
export const crud = ({
  method = 'GET',
  endpoint,
  keys,
  query = {},
  body,
  meta = {},
  name = 'base_',
  headers = {
    'Content-Type': 'application/json'
  },
  needToken = true
}) => {
  const action = {
    needToken,
    [RSAA]: {
      endpoint,
      method,
      headers,
      types: [
        { type: `${name}_${CRUD_ACTION_REQUEST}`, meta: { query, ...meta } },
        { type: `${name}_${CRUD_ACTION_SUCCESS}`, meta: { query, ...meta } },
        { type: `${name}_${CRUD_ACTION_FAILURE}`, meta: { query, ...meta } }
      ]
    }
  };

  if (keys) {
    Object.keys(keys).forEach(key => {
      action[RSAA].endpoint = action[RSAA].endpoint.replace(
        `:${key}`,
        keys[key]
      );
    });
  }

  if (query && Object.keys(query).length) {
    const compactedQuery = cloneDeep(query);
    Object.entries(compactedQuery).forEach(([key, value]) => {
      const arr = Array.isArray(value) ? value : [value];
      compactedQuery[key] = compact(arr);
    });
    const queryString = queryBuilder.stringify(compactedQuery);

    if (queryString.length) {
      action[RSAA].endpoint = `${action[RSAA].endpoint}?${queryString}`;
    }
  }

  if (body) {
    action[RSAA].body = JSON.stringify(body);
  }

  return action;
};
