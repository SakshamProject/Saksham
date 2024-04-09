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
  total: number,
  count: number
) => {
  const createdResponse = {
    data: result,
    request: {
      start: (request.start || 0) + 1,
      rows: request.rows,
      orderBy: request.orderBy,
      sortOrder: request.sortOrder
    },
    total: total,
    count: count,
  };
  return createdResponse;
};

const createResponseForFilter = (
  result: Object[] = [],
  request: getRequestType,
  total: number = 0,
  count: number,
  filters: Object
) => {
  const createdResponse = {
    data: result,
    request: {
      start: (request.start || 0) + 1,
      rows: request.rows,
      orderBy: request.orderBy,
      sortOrder: request.sortOrder
    },
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
