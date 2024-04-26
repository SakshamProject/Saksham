import { NextFunction, Request, Response } from "express";
import {
  ServiceAdditionalWhereSchemaType,
  ServiceMappingWhere,
  getServiceMappingSchema,
  serviceAdditionalWhereSchema,
  serviceMappingFilter,
} from "../../types/serviceMapping/serviceMappingScreens.js";
import {
  getServiceMappingByDivyangIdDB,
  getServiceMappingByIdDB,
} from "../../services/database/serviceMapping/read.js";
import {
  createResponseForFilter,
  createResponseOnlyData,
} from "../../types/createResponseSchema.js";
import { serviceMappingColumnNameMapper } from "../../services/database/utils/serviceMapping/serviceMappingMapper.js";
import ServiceMappingGlobalSearchConditions from "../../services/database/utils/serviceMapping/globalSearchCondition.js";
import { createServiceMappingFilterInputObject } from "../../dto/serviceMapping/get.js";
import getServiceMappingDBTransaction, {
  getServiceMappingByDivyangIdDBTransaction,
} from "../../services/database/serviceMapping/transaction/read.js";

const getServiceMapping = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const serviceMappingRequest = getServiceMappingSchema.parse(request.body);
    const serviceAdditionalWhere: ServiceAdditionalWhereSchemaType =
      serviceAdditionalWhereSchema.parse(request.query);
    const orderByColumnAndSortOrder = serviceMappingColumnNameMapper(
      serviceMappingRequest.sorting?.orderByColumn,
      serviceMappingRequest.sorting?.sortOrder
    );
    const globalSearchConditions: ServiceMappingWhere | null =
      serviceMappingRequest.searchText === undefined ||
      serviceMappingRequest.searchText === ""
        ? null
        : ServiceMappingGlobalSearchConditions(
            serviceMappingRequest.searchText
          );
    const serviceMappingWhereInput = createServiceMappingFilterInputObject(
      serviceMappingRequest.filters,
      globalSearchConditions,
      serviceAdditionalWhere
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
    const result = await getServiceMappingByIdDB(serviceMappingId);
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getServiceMappingByDivyangId = async (
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
      serviceMappingRequest.searchText === undefined ||
      serviceMappingRequest.searchText === ""
        ? null
        : ServiceMappingGlobalSearchConditions(
            serviceMappingRequest.searchText
          );
    const serviceMappingWhereInput = createServiceMappingFilterInputObject(
      serviceMappingRequest.filters,
      globalSearchConditions,
      undefined
    );
    const divyangId = request.params.divyangId;
    const result = await getServiceMappingByDivyangIdDBTransaction(
      divyangId,
      serviceMappingRequest.pagination?.start,
      serviceMappingRequest.pagination?.rows,
      serviceMappingWhereInput,
      orderByColumnAndSortOrder
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
export {
  getServiceMapping,
  getServiceMappingById,
  getServiceMappingByDivyangId,
};
