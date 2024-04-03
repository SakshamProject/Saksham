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
  count: number
) => {
  const createdResponse = { data: result, request: requestQuery, total: count };
  return createdResponse;
};

const createResponseForFilter = (
  result: Object,
  requestQuery: getRequestType,
  filters: Object,
  count: number
) => {
  const createdResponse = {};
  return createdResponse;
};

export {
  createResponseOnlyData,
  createResponseWithQuery,
  createResponseForFilter,
};