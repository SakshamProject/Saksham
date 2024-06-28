import { NextFunction, Request, Response } from 'express';
import {
  getDisabilityOfDivyangByIdDB,
  getDisabilityOfDivyangDB,
} from '../../../services/database/divyangDetails/disabilityOfDivyang/read.js';
import {
  getDisabilityOfDivyangFiles,
  getFileFromCloud,
} from '../../../services/files/get.js';
import { createResponseWithFile } from '../../../types/createResponseSchema.js';

const getDisabilityOfDivyangById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const id = request.params.id;
    const result = await getDisabilityOfDivyangByIdDB(id);
    let files = null;
    let responseData = {};

    if (result && result !== undefined && result.disabilityCardKey != null) {
      files = await getFileFromCloud(result.disabilityCardKey);
      responseData = createResponseWithFile(result, files);
    } else if (result) {
      responseData = createResponseWithFile(result, {});
    }

    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

const getDisabilityOfDivyangByDivyangId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const divyangId = request.params.divyangId;
    const result = await getDisabilityOfDivyangDB(divyangId);
    let files = null;
    let responseData = {};
    if (result) {
      files = await getDisabilityOfDivyangFiles(result);
      responseData = createResponseWithFile(result, { disabilityCards: files });
    } else if (result) {
      responseData = createResponseWithFile(result, {});
    }
    response.send(responseData);
  } catch (error) {
    next(error);
  }
};

export { getDisabilityOfDivyangById, getDisabilityOfDivyangByDivyangId };
