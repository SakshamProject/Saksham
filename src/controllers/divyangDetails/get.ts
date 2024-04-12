import { NextFunction, Response, Request } from 'express'
import getRequestSchema from '../../types/getRequestSchema.js'
import {
  createResponseOnlyData,
  createResponseWithQuery,
} from '../../types/createResponseSchema.js'
import { getDivyangDetailsDBTransaction } from '../../services/database/divyangDetails/transaction/read.js'
import { getDivyangDetailsSchema } from '../../types/divyangDetails/divyangDetailsSchema.js'
import { getDivyangDetailsByIdDB } from '../../services/database/divyangDetails/read.js'

const getDivyangDetails = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const query = getRequestSchema.parse(request.query)
    const result = await getDivyangDetailsDBTransaction(
      query.start,
      query.rows,
      query.sortOrder,
      query.searchText,
    )
    const count: number = result?.divyangDetails?.length || 0
    const total: number = result?.total || 0
    const responseData = createResponseWithQuery(
      result?.divyangDetails || {},
      query,
      total,
      count,
    )

    response.send(responseData)
  } catch (error) {
    next(error)
  }
}

const getDivyangDetailsbyId = async (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const id: string = request.params.id
    const result:
      | getDivyangDetailsSchema
      | undefined = await getDivyangDetailsByIdDB(id)
    const responseData = createResponseOnlyData(result || {})
    response.send(responseData)
  } catch (error) {
    next(error)
  }
}

export { getDivyangDetails, getDivyangDetailsbyId }
