import { sortOrderEnum } from '../../../../types/getRequestSchema.js'
import { DivyangDetailsColumnNamesEnum } from '../../../../types/divyangDetails/divyangDetailsDefaults.js'

const divyangDetailsColumnNameMapper = (
  orderByColumn: DivyangDetailsColumnNamesEnum = DivyangDetailsColumnNamesEnum.DIVYANG_NAME,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending,
) => {
  const divyangDetailsColumnNameMap: Map<string, Object> = new Map()

  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_NAME, {
    firstName: sortOrder,
  })

  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_ID, {
    divyangId: sortOrder,
  })

  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.EMAIL_ID, {
    mailId: sortOrder,
  })
  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.MOBILE_NUMBER, {
    mobileNumber: sortOrder,
  })

  return divyangDetailsColumnNameMap.get(orderByColumn)
}

export { divyangDetailsColumnNameMapper }
