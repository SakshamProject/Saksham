import { NextFunction, Request, Response } from "express";
import {
  ServiceMappingWhere,
  getServiceMappingSchema,
  serviceMappingFilter,
} from "../../types/serviceMapping/serviceMappingScreens.js";
import { getServiceMappingByIdDB } from "../../services/database/serviceMapping/read.js";
import {
  createResponseForFilter,
  createResponseOnlyData,
} from "../../types/createResponseSchema.js";
import { serviceMappingColumnNameMapper } from "../../services/database/utils/serviceMapping/serviceMappingMapper.js";
import ServiceMappingGlobalSearchConditions from "../../services/database/utils/serviceMapping/globalSearchCondition.js";
import { createServiceMappingFilterInputObject } from "../../dto/serviceMapping/get.js";
import getServiceMappingDBTransaction from "../../services/database/serviceMapping/transaction/read.js";

const getServiceMapping = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const serviceMappingRequest = getServiceMappingSchema.parse(request.body);
    const orderByColumnAndSortOrder = serviceMappingColumnNameMapper(
      serviceMappingRequest.sorting?.orderByColumn,
      serviceMappingRequest.sorting?.sortOrder
    );
    const globalSearchConditions: ServiceMappingWhere | null =
      serviceMappingRequest.searchText === undefined
        ? null
        : ServiceMappingGlobalSearchConditions(
            serviceMappingRequest.searchText
          );
    const serviceMappingWhereInput = createServiceMappingFilterInputObject(
      serviceMappingRequest.filters,
      globalSearchConditions
    );
    const result = await getServiceMappingDBTransaction(
      serviceMappingWhereInput,
      orderByColumnAndSortOrder,
      serviceMappingRequest.pagination?.start,
      serviceMappingRequest.pagination?.rows
    );
    const total = result?.total || 0;
    const count = result?.serviceMappings?.length || 0;
    const responseData = createResponseForFilter(
      result?.serviceMappings,
      request.body,
      total,
      count
    );
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getServiceMappingById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const serviceMappingId = request.params.id;
    const result = getServiceMappingByIdDB(serviceMappingId);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getServiceMapping, getServiceMappingById };
