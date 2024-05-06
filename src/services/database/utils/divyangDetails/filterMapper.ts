import { Prisma } from '@prisma/client'
import { DivyangDetailsColumnNamesEnum } from '../../../../types/divyangDetails/divyangDetailsDefaults.js'
import {
  DivyangDetailsFilterType,
  DivyangDetailsWhere,
} from '../../../../types/divyangDetails/divyangDetailsSchema.js'
import { filterOperationsEnum } from '../../../../types/inputFieldSchema.js'

const filterDivyangDetailsMapper = (
  columnName: string,
  filterOperation: filterOperationsEnum,
  value: string,
) => {
  const filterDivyangDetailsMap: Map<
    string,
    Prisma.DivyangDetailsWhereInput
  > = new Map()

  const operation =
    filterOperation === filterOperationsEnum.NOTEQUALS
      ? filterOperationsEnum.EQUALS
      : filterOperation

  filterDivyangDetailsMap.set(
    DivyangDetailsColumnNamesEnum.DIVYANG_FIRST_NAME,
    {
      firstName: {
        [operation]: value,
        mode: 'insensitive',
      },
    },
  )
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_LAST_NAME, {
    lastName: {
      [operation]: value,
      mode: 'insensitive',
    },
  })
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_ID, {
    divyangId: {
      [operation]: value,
      mode: 'insensitive',
    },
  })
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.MOBILE_NUMBER, {
    mobileNumber: {
      [operation]: value,
      mode: 'insensitive',
    },
  })
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.EMAIL_ID, {
    mailId: {
      [operation]: value,
      mode: 'insensitive',
    },
  })

  if (filterOperation === filterOperationsEnum.NOTEQUALS) {
    return {
      NOT: filterDivyangDetailsMap.get(columnName),
    }
  }
  return filterDivyangDetailsMap.get(columnName)
}

const generateDivyangDetailsFilter = (
  divyangDetailsfilter: DivyangDetailsFilterType | undefined,
  globalSearchConditions: DivyangDetailsWhere | null,
  personId:string,
  admin:Boolean
) => {
  const DivyangDetailsWhereInput: any = {
    AND: [],
  }
  if (divyangDetailsfilter) {
    for (const { operation, value, field } of divyangDetailsfilter) {
      DivyangDetailsWhereInput.AND.push(
        filterDivyangDetailsMapper(field, operation, value),
      )
    }
  }
  if (admin === false && personId) {
    const additionalWhere: DivyangDetailsWhere = {
      createdById: personId 
    }
  }
  if (globalSearchConditions != null)
    DivyangDetailsWhereInput.AND.push(globalSearchConditions)
  return DivyangDetailsWhereInput
}

export { filterDivyangDetailsMapper, generateDivyangDetailsFilter }
