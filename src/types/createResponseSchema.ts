import { getRequestType } from "./getRequestSchema.js";

const createResponseOnlyData = (result: Object) => {
  const createdResponse = {
    data: result,
  };
  return createdResponse;
};
const createResponseWithQuery = (
  result: Object,
  requestQuery: getRequestType,
  total: number,
  count: number
) => {
  const createdResponse = {
    data: result,
    request: requestQuery,
    total: total,
    count: count,
  };
  return createdResponse;
};

const createResponseForFilter = (
  result: Object,
  requestQuery: getRequestType,
  total: number,
  count: number,
  filters: Object
) => {
  const createdResponse = {
    data: result,
    request: requestQuery,
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
