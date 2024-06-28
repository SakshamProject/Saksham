import { NextFunction, Response, Request } from 'express';
import {
  userListSchema,
  usersPostSchema,
} from '../../types/users/usersSchema.js';
import log from '../../services/logger/logger.js';
import { createPersonDB } from '../../services/database/users/create.js';
import {
  createResponseForFilter,
  createResponseOnlyData,
} from '../../types/createResponseSchema.js';
import { getUsersDBTransaction } from '../../services/database/users/transaction/read.js';
import {
  createPersonDBObject,
  listUserWhereInput,
} from '../../dto/users/post.js';
import { getUserByPersonIdDB } from '../../services/database/users/read.js';
import { handleProfilePhotoFile } from '../../services/files/profilePhoto.js';
import { Prisma } from '@prisma/client';
import createPersonTransactionDB from '../../services/database/users/transaction/create.js';

async function postUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body = usersPostSchema.parse(request.body);
    const createdBy = request.token?.personId;
    const userInputObject = createPersonDBObject(body, createdBy, createdBy);
    const newPerson = await createPersonTransactionDB(userInputObject, request);
    const responseData = createResponseOnlyData(newPerson);
    response.send(responseData);
  } catch (error) {
    next(error);
  }
}

async function listUser(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const body = userListSchema.parse(request.body);
    log('info', '[controller/listUser]: body: %o', body);
    const userWhereInput = listUserWhereInput(body);
    log('info', '[controller/listUser]: userWhereInput: %o', userWhereInput);
    const result = await getUsersDBTransaction(
      body.pagination?.start,
      body.pagination?.rows,
      body.sorting?.sortOrder,
      body.sorting?.orderByColumn,
      userWhereInput
    );
    log('info', '[controller/listUser]: result: %o', result || {});

    const responseData = createResponseForFilter(
      result?.users,
      body,
      result?.total,
      result?.users?.length
    );
    response.json(responseData);
  } catch (error) {
    next(error);
  }
}

export { postUser, listUser };
