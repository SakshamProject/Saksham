import express from 'express';
import fileHandler from '../../middlewares/fileHandler/fileHandler.js';
import {
  AuthorizationEnum,
  MethodsEnum,
} from '../../types/authentication/authorizationEnum.js';
import authorization from '../../middlewares/authentication/authorization.js';
import { postDisabilityOfDivyang } from '../../controllers/divyangDetails/disabilityOfDivyang/post.js';
import { putDisabilityOfDivyang } from '../../controllers/divyangDetails/disabilityOfDivyang/put.js';
import {
  getDisabilityOfDivyangByDivyangId,
  getDisabilityOfDivyangById,
} from '../../controllers/divyangDetails/disabilityOfDivyang/get.js';
import { deleteDisabilityOfDivyang } from '../../controllers/divyangDetails/disabilityOfDivyang/delete.js';

const disabilityOfDivyangRouter = express.Router();

disabilityOfDivyangRouter.post(
  '/',
  authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.PUT),
  fileHandler.fields([{ name: 'disabilityCards', maxCount: 1 }]),
  postDisabilityOfDivyang
);
disabilityOfDivyangRouter.put(
  '/:id',
  authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.PUT),
  fileHandler.fields([{ name: 'disabilityCards', maxCount: 1 }]),
  putDisabilityOfDivyang
);
disabilityOfDivyangRouter.get(
  '/:id',
  authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.PUT),
  getDisabilityOfDivyangById
);
disabilityOfDivyangRouter.get(
  '/list/:divyangId',
  authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.PUT),
  getDisabilityOfDivyangByDivyangId
);
disabilityOfDivyangRouter.delete(
  '/:id',
  authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.PUT),
  deleteDisabilityOfDivyang
);

export { disabilityOfDivyangRouter };
