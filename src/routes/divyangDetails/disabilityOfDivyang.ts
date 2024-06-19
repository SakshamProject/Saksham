import express from 'express';
import fileHandler from '../../middlewares/fileHandler/fileHandler.js';
import {
  AuthorizationEnum,
  MethodsEnum,
} from '../../types/authentication/authorizationEnum.js';
import authorization from '../../middlewares/authentication/authorization.js';
import { postDisabilityOfDivyang } from '../../controllers/divyangDetails/disabilityOfDivyang/post.js';
import { putDisabilityOfDivyang } from '../../controllers/divyangDetails/disabilityOfDivyang/put.js';

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

export { disabilityOfDivyangRouter };
