import { Prisma } from '@prisma/client';
import { DivyangDetailsColumnNamesEnum } from '../../../../types/divyangDetails/divyangDetailsDefaults.js';
import {
  DivyangDetailsFilterType,
  DivyangDetailsWhere,
} from '../../../../types/divyangDetails/divyangDetailsSchema.js';
import { filterOperationsEnum } from '../../../../types/inputFieldSchema.js';

const filterDivyangDetailsMapper = (
  columnName: string,
  filterOperation: filterOperationsEnum,
  value: string
) => {
  const filterDivyangDetailsMap: Map<string, Prisma.DivyangDetailsWhereInput> =
    new Map();

  const operation =
    filterOperation === filterOperationsEnum.NOTEQUALS
      ? filterOperationsEnum.EQUALS
      : filterOperation;

  filterDivyangDetailsMap.set(
    DivyangDetailsColumnNamesEnum.DIVYANG_FIRST_NAME,
    {
      firstName: {
        [operation]: value,
        mode: 'insensitive',
      },
    }
  );
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_LAST_NAME, {
    lastName: {
      [operation]: value,
      mode: 'insensitive',
    },
  });
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_ID, {
    divyangId: {
      [operation]: value,
      mode: 'insensitive',
    },
  });
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.MOBILE_NUMBER, {
    mobileNumber: {
      [operation]: value,
      mode: 'insensitive',
    },
  });
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.EMAIL_ID, {
    mailId: {
      [operation]: value,
      mode: 'insensitive',
    },
  });

  if (filterOperation === filterOperationsEnum.NOTEQUALS) {
    return {
      NOT: filterDivyangDetailsMap.get(columnName),
    };
  }
  return filterDivyangDetailsMap.get(columnName);
};

const generateDivyangDetailsFilter = (
  divyangDetailsfilter: DivyangDetailsFilterType | undefined,
  globalSearchConditions: DivyangDetailsWhere | null,
  token: Token
) => {
  const DivyangDetailsWhereInput: any = {
    AND: [],
  };
  if (divyangDetailsfilter) {
    for (const { operation, value, field } of divyangDetailsfilter) {
      DivyangDetailsWhereInput.AND.push(
        filterDivyangDetailsMapper(field, operation, value)
      );
    }
  }
  // if a user have divyang accesss => can see all servicemapping
  // if not then this condition
  if (!token.superAdminId && token.personId && !token.divyangDetailsAccess) {
    if (token.serviceMappingAccess) {
      // if a user don't have divyang details access but has servicemapping access
      // then show details of divyang created by him in past and divyang assigned to him in servicemapping
      const additionalWhere: DivyangDetailsWhere = {
        OR: [
          {
            createdById: token.personId,
          },
          {
            services: {
              some: {
                userId: token.userId,
              },
            },
          },
        ],
      };
      DivyangDetailsWhereInput.AND.push(additionalWhere);
    }
    // if user don't have divyang and service mapping access show them the divyang created by them in past only
    else {
      const additionalWhere: DivyangDetailsWhere = {
        createdById: token.personId,
      };
      DivyangDetailsWhereInput.AND.push(additionalWhere);
    }
  }

  if (globalSearchConditions != null)
    DivyangDetailsWhereInput.AND.push(globalSearchConditions);
  return DivyangDetailsWhereInput;
};

export { filterDivyangDetailsMapper, generateDivyangDetailsFilter };
