import { NextFunction, Response, Request } from "express";
import {
    createResponseOnlyData,
    createResponseWithFiles,
    createResponseWithQuery,
} from '../../types/createResponseSchema.js'
import {getDivyangDetailsDBTransaction} from '../../services/database/divyangDetails/transaction/read.js'
import {
  DivyangDetailsSchemaType,
  DivyangDetailsSearchType,
  getDivyangDetailsSchema,
  getDivyangDetailsSearch,
} from "../../types/divyangDetails/divyangDetailsSchema.js";
import {
  getDivyangDetailsByIdDB,
  getDivyangDetailsSearchByColumnDB,
  getDivyangDetailsStatusDB,
} from "../../services/database/divyangDetails/read.js";
import DivyangDetailsGlobalSearchConditions from "../../services/database/utils/divyangDetails/searchConditions.js";
import { createDivyangDetailsFilterInputObject } from "../../dto/divyangDetails/post.js";
import { divyangDetailsColumnNameMapper } from "../../services/database/utils/divyangDetails/divyangDetailsMapper.js";
import prisma from "../../services/database/database.js";
import {
    disabilityCardsResponse,
    filesResponse,
    getDivyangDetailsDisabilityCardsFileURLS,
    getDivyangDetailsIDProofFileURLs
} from "../../services/files/files.js";
import log from "../../services/logger/logger.js";

const getDivyangDetails = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangDetailsRequest: DivyangDetailsSchemaType =
      getDivyangDetailsSchema.parse(request.body);
    const orderByColumnAndSortOrder = divyangDetailsColumnNameMapper(
      divyangDetailsRequest.sorting?.orderByColumn,
      divyangDetailsRequest.sorting?.sortOrder
    );
    const globalSearchConditions = DivyangDetailsGlobalSearchConditions(
      divyangDetailsRequest.searchText
    );
    const divyangDetailsWhereInput = createDivyangDetailsFilterInputObject(
      divyangDetailsRequest.filters,
      globalSearchConditions,
      request.token!
    );
    const result = await getDivyangDetailsDBTransaction(
      divyangDetailsWhereInput,
      divyangDetailsRequest.pagination?.start,
      divyangDetailsRequest.pagination?.rows,
      orderByColumnAndSortOrder
    );
    const count: number = result?.divyangDetails?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.divyangDetails || {},
      divyangDetailsRequest,
      total,
      count
    );

    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getDivyangDetailsbyId = async (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    try {
        const id: string = request.params.id
        const divyangDetails:
            | getDivyangDetailsSchema
            | undefined = await getDivyangDetailsByIdDB(id)
        const currentDate = new Date(Date.now()).toISOString()
        const currentAuditLog = await getDivyangDetailsStatusDB(
            prisma,
            id,
            currentDate,
        )
        const result = {
            ...divyangDetails,
            status: currentAuditLog?.status,
            description: currentAuditLog?.description,
            effectiveFromDate: currentAuditLog?.date,
            timestamp: currentDate,
        }
        let fileURLs: filesResponse | undefined = [];
        let disabilityCards: disabilityCardsResponse | undefined = [];
        const personId = result?.personId;
        if (personId) {
             fileURLs = await getDivyangDetailsIDProofFileURLs(personId);
             disabilityCards = await getDivyangDetailsDisabilityCardsFileURLS(personId);
        }
        log("info", "[getDivyangDetailsById]: fileURLs: %o", fileURLs);
        log("info", "[getDivyangDetailsById]: fileURLs: %o", fileURLs);

        const responseData = createResponseWithFiles(result, fileURLs, disabilityCards);
        response.send(responseData)
    } catch (error) {
        next(error)
    }
}

const getDivyangDetailsSearchByColumn = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangDetailsSearchRequest: DivyangDetailsSearchType =
      getDivyangDetailsSearch.parse(request.query);
    const result = await getDivyangDetailsSearchByColumnDB(
      divyangDetailsSearchRequest
    );
    const responseData = createResponseOnlyData(result);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export {
  getDivyangDetails,
  getDivyangDetailsbyId,
  getDivyangDetailsSearchByColumn,
};
