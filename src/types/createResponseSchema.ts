import { getRequestType } from "./getRequestSchema.js";

const createResponseOnlyData = (result: Object = {}) => {
  const createdResponse = {
    data: result,
  };
  return createdResponse;
};

const createResponseWithQuery = (
  result: Object = {},
  request: getRequestType,
  total: number = 0,
  count: number = 0
) => {
  const createdResponse = {
    data: result,
    request: {
      start: request.start ? request.start + 1 : 0,
      rows: request.rows,
      orderByColumn: request.orderByColumn,
      sortOrder: request.sortOrder,
      searchText: request.searchText,
    },
    total: total,
    count: count,
  };
  return createdResponse;
};

const createResponseForFilter = (
  result: Object = {},
  request: Object = {},
  total: number = 0,
  count: number,
  filters: Object
) => {
  const createdResponse = {
    data: result,
    request: request,
    total: total,
    count: count,
    filters: filters,
  };
  return createdResponse;
};

export {
  createResponseOnlyData,
  createResponseWithQuery,
  createResponseForFilter,
};
