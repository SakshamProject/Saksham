import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import { DivyangDetailsColumnNamesEnum } from "../../../../types/divyangDetails/divyangDetailsDefaults.js";
import { Prisma } from "@prisma/client";

const divyangDetailsColumnNameMapper = (
  orderByColumn: DivyangDetailsColumnNamesEnum = DivyangDetailsColumnNamesEnum.DIVYANG_FIRST_NAME,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending
) => {
  const divyangDetailsColumnNameMap: Map<
    string,
    Prisma.DivyangDetailsOrderByWithAggregationInput
  > = new Map();

  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_FIRST_NAME, {
    firstName: sortOrder,
  });

  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.DIVYANG_ID, {
    divyangId: sortOrder,
  });

  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.EMAIL_ID, {
    mailId: sortOrder,
  });
  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.MOBILE_NUMBER, {
    mobileNumber: sortOrder,
  });
  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.CREATED_AT, {
    createdAt: sortOrder,
  });
  divyangDetailsColumnNameMap.set(DivyangDetailsColumnNamesEnum.UPDATED_AT, {
    updatedAt: sortOrder,
  });
  return divyangDetailsColumnNameMap.get(orderByColumn);
};

export { divyangDetailsColumnNameMapper };
