import { Prisma } from '@prisma/client'
import throwDatabaseError from '../utils/errorHandler.js'
import defaults from '../../../defaults.js'
import { serviceMasterColumnNameMapper } from '../utils/serviceMaster/serviceMasterColumnNameMapper.js'
import serviceMasterDefaults from './defaults/defaults.js'
import { sortOrderEnum } from '../../../types/getRequestSchema.js'

async function filterServiceDB(
  prismaTransaction: Prisma.TransactionClient,
  orderBy = serviceMasterDefaults.orderBy,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  skip = defaults.skip,
  take = defaults.take,
  serviceTypeWhereInput: Prisma.ServiceTypeWhereInput,
) {
  try {
    const query: Prisma.ServiceTypeFindManyArgs = {
      select: serviceMasterDefaults.select,
      where: serviceTypeWhereInput,
      skip: skip,
      orderBy: serviceMasterColumnNameMapper(orderBy, sortOrder),
    }

    if (take > 0) {
      query.take = take
    }

    const results = await prismaTransaction.serviceType.findMany(query)
    return results
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error)
    }
  }
}

async function filterServiceTotalDB(
  prismaTransaction: Prisma.TransactionClient,
  serviceTypeWhereInput: Prisma.ServiceTypeWhereInput,
) {
  try {
    const count = await prismaTransaction.serviceType.count({
      where: serviceTypeWhereInput,
    })
    return count
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error)
    }
  }
}

export { filterServiceDB, filterServiceTotalDB }
