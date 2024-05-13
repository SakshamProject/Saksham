import { Prisma } from "@prisma/client";
import { DivyangDetailsColumnNamesEnum } from "../../../../types/divyangDetails/divyangDetailsDefaults.js";
import {
  DivyangDetailsFilterType,
  DivyangDetailsWhere,
} from "../../../../types/divyangDetails/divyangDetailsSchema.js";
import { filterOperationsEnum } from "../../../../types/inputFieldSchema.js";

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
        mode: "insensitive",
      },
    }
  );
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_LAST_NAME, {
    lastName: {
      [operation]: value,
      mode: "insensitive",
    },
  });
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_ID, {
    divyangId: {
      [operation]: value,
      mode: "insensitive",
    },
  });
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.MOBILE_NUMBER, {
    mobileNumber: {
      [operation]: value,
      mode: "insensitive",
    },
  });
  filterDivyangDetailsMap.set(DivyangDetailsColumnNamesEnum.EMAIL_ID, {
    mailId: {
      [operation]: value,
      mode: "insensitive",
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
  if (!token.superAdminId && token.personId) {
    /*Case if a user has divyang and also serviceMapping access
     ---then user can see all divyangs which are created by sevaKendra of currentUser */
    if (token.serviceMappingAccess) {
      const additionalWhere: DivyangDetailsWhere = {
        createdBy: {
          user: {
            designation: {
              sevaKendraId: token.userSevaKendraId,
            },
          },
        },
      };
      DivyangDetailsWhereInput.AND.push(additionalWhere);
    } else {
      /* If a user doesn't have serviceMapping access
    --- then user can see divyang only created by user*/
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
