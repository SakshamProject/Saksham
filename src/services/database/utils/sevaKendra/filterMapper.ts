import { Prisma } from "@prisma/client";
import {
  SevaKendraFilterType,
  SevaKendraWhere,
} from "../../../../types/sevaKendra/sevaKendra.js";
import { SevaKendraColumnNamesEnum } from "../../../../types/sevaKendra/sevaKendraDefaults.js";
import { filterOperationsEnum } from "../../../../types/inputFieldSchema.js";

const filterSevaKendraMapper = (
  columnName: string,
  filterOperation: filterOperationsEnum,
  value: string
) => {
  const filterSevaKendraMap: Map<string, Prisma.SevaKendraWhereInput> =
    new Map();

  const operation =
    filterOperation === filterOperationsEnum.NOTEQUALS
      ? filterOperationsEnum.EQUALS
      : filterOperation;

  filterSevaKendraMap.set(SevaKendraColumnNamesEnum.NAME, {
    name: {
      [operation]: value,
      mode: "insensitive",
    },
  });

  filterSevaKendraMap.set(SevaKendraColumnNamesEnum.DISTRICT, {
    district: {
      name: {
        [operation]: value,
        mode: "insensitive",
      },
    },
  });
  filterSevaKendraMap.set(SevaKendraColumnNamesEnum.STATE, {
    district: {
      state: {
        name: {
          [operation]: value,
          mode: "insensitive",
        },
      },
    },
  });
  filterSevaKendraMap.set(SevaKendraColumnNamesEnum.CONTACTNAME, {
    contactPerson: {
      name: {
        [operation]: value,
        mode: "insensitive",
      },
    },
  });
  filterSevaKendraMap.set(SevaKendraColumnNamesEnum.CONTACTNUMBER, {
    contactPerson: {
      phoneNumber1: {
        [operation]: value,
        mode: "insensitive",
      },
    },
  });
  if (filterOperation === filterOperationsEnum.NOTEQUALS) {
    return {
      NOT: filterSevaKendraMap.get(columnName),
    };
  }
  return filterSevaKendraMap.get(columnName);
};

const generateSevaKendraFilter = (
  sevaKendrafilter: SevaKendraFilterType | undefined,
  globalSearchConditions: SevaKendraWhere | null
) => {
  const SevaKendraWhereInput: any = {
    AND: [],
  };
  if (sevaKendrafilter) {
    for (const { operation, value, field } of sevaKendrafilter) {
      SevaKendraWhereInput.AND.push(
        filterSevaKendraMapper(field, operation, value)
      );
    }
  }
  if (globalSearchConditions != null)
    SevaKendraWhereInput.AND.push(globalSearchConditions);
  return SevaKendraWhereInput;
};

export { filterSevaKendraMapper, generateSevaKendraFilter };
