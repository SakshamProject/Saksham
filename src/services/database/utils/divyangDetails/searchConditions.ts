import { DivyangDetailsWhere } from '../../../../types/divyangDetails/divyangDetailsSchema.js'

const DivyangDetailsGlobalSearchConditions = (searchText: string = '') => {
  const searchConditions: DivyangDetailsWhere = {
    OR: [
      {
        firstName: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
      {
        lastName: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
      {
        mailId: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
      {
        mobileNumber: {
          contains: searchText,
          mode: 'insensitive',
        },
      },
      {
        divyangId: {
          mode: 'insensitive',
          contains: searchText,
        },
      },
    ],
  }
  return searchConditions
}

export default DivyangDetailsGlobalSearchConditions
