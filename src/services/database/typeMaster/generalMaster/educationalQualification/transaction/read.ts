import defaults from '../../../../../../defaults.js'
import { sortOrderEnum } from '../../../../../../types/getRequestSchema.js'
import prisma from '../../../../database.js'
import throwDatabaseError from '../../../../utils/errorHandler.js'
import {
    getEducationQualificationByEducationQualificationTypeIdDB,
  getEducationQualificationByEducationQualificationTypeIdDBTotal,
  getEducationQualificationTypeDB,
  getEducationQualificationTypeDBTotal,
} from '../read.js'

async function getEducationQualificationTypeDBTransaction(
  skip: number = defaults.skip,
  take: number = defaults.take,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
  searchText: string = '',
) {
  const transaction = await prisma.$transaction(async (prismaTransaction) => {
    try {
      const educationQualificationType = await getEducationQualificationTypeDB(
        prismaTransaction,
        skip,
        take,
        sortOrder,
        searchText,
      )

      const total = await getEducationQualificationTypeDBTotal(
        prismaTransaction,
        searchText,
      )

      return { educationQualificationType, total }
    } catch (error) {
      if (error instanceof Error) {
        throwDatabaseError(error)
      }
    }
  })

  return transaction
}

async function getEducationQualificationByEducationQualificationTypeIdDBTransaction(
    id: string | undefined,
    skip: number = defaults.skip,
    take: number = defaults.take,
    sortOrder: sortOrderEnum = sortOrderEnum.ascending
) {
    const transaction = await prisma.$transaction(async (prismaTransaction) => {
        try {
            const educationQualificationByType = await getEducationQualificationByEducationQualificationTypeIdDB(
                prismaTransaction,
                id,
                skip,
                take,
                sortOrder
            )

            const total = await getEducationQualificationByEducationQualificationTypeIdDBTotal(
                prismaTransaction,
                id
            )

            return {educationQualificationByType, total}
        } catch(error) {
            if (error instanceof Error) {
                throwDatabaseError(error)
            }
        }
    },
    {
      isolationLevel: defaults.transactionOptions.isolationLevel,
      maxWait: 5000,
      timeout: 10000,
    },
  )
    return transaction
}

export {getEducationQualificationTypeDBTransaction, getEducationQualificationByEducationQualificationTypeIdDBTransaction}