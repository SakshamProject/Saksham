import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import { SevaKendraColumnNamesEnum } from "../../../types/sevaKendra/sevaKendraDefaults.js";

const sevaKendraColumnNameMapper = (
  orderByColumn: SevaKendraColumnNamesEnum = SevaKendraColumnNamesEnum.NAME,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending
) => {
  const sevaKendraColumnNameMap: Map<string, Object> = new Map();

  sevaKendraColumnNameMap.set(SevaKendraColumnNamesEnum.NAME, {
    name: sortOrder,
  });

  sevaKendraColumnNameMap.set(SevaKendraColumnNamesEnum.DISTRICT, {
    district: {
      name: sortOrder,
    },
  });

  sevaKendraColumnNameMap.set(SevaKendraColumnNamesEnum.STATE, {
    district: {
      state: {
        name: sortOrder,
      },
    },
  });
  sevaKendraColumnNameMap.set(SevaKendraColumnNamesEnum.CONTACTNAME, {
    contactPerson: {
      name: sortOrder,
    },
  });
  sevaKendraColumnNameMap.set(SevaKendraColumnNamesEnum.CONTACTNUMBER, {
    contactPerson: {
      phoneNumber1: sortOrder,
    },
  });

  return sevaKendraColumnNameMap.get(orderByColumn);
};

export { sevaKendraColumnNameMapper };
