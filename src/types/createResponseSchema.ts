import { getRequestType } from "./getRequestSchema.js";

const createResponseOnlyData = (result: Object = {}) => {
  const createdResponse = {
    data: result,
  };
  return createdResponse;
};

function createResponseWithFile(result: Object = {}, file: Object = {}) {
  return (
      {
        data: result,
        file: file
      }
  )
}

function createResponseWithFiles(result: Object = {}, files: Object[] = []) {
  return (
      {
        data: result,
        files: files
      }
  )
}

const createResponseWithQuery = (
  result: Object = {},
  request: getRequestType,
  total: number = 0,
  count: number = 0
) => {
  const createdResponse = {
    data: result,
    request: {
      start: (request.start || 0) + 1,
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
  count: number = 0
) => {
  const createdResponse = {
    data: result,
    request: request,
    total: total,
    count: count,
  };
  return createdResponse;
};

export {
  createResponseOnlyData,
  createResponseWithQuery,
  createResponseForFilter,
    createResponseWithFiles,
    createResponseWithFile
};
