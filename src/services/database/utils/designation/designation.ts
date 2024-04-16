import { Prisma } from "@prisma/client";
import { designationColumnNamesEnum } from "../../../../types/designation/designationEnum.js";
import { DesignationWhere } from "../../../../types/designation/designationSchema.js";
import { sortOrderEnum } from "../../../../types/getRequestSchema.js";
import { filterOperationsEnum } from "../../../../types/inputFieldSchema.js";

function designationColumnNameMapper(
  orderByColumn: designationColumnNamesEnum = designationColumnNamesEnum.DESIGNATIONS,
  sortOrder: sortOrderEnum = sortOrderEnum.ascending
) {
  const designationColumnNameMap: Map<string, any> = new Map();

  designationColumnNameMap.set("createdAt", {
    createdAt: sortOrder,
  });

  designationColumnNameMap.set("designations", {
    name: sortOrder,
  });

  designationColumnNameMap.set("sevaKendraName", {
    sevaKendra: {
      name: sortOrder,
    },
  });

  designationColumnNameMap.set("sevaKendraDistrict", {
    sevaKendra: {
      district: {
        name: sortOrder,
      },
    },
  });

  designationColumnNameMap.set("sevaKendraState", {
    sevaKendra: {
      district: {
        state: {
          name: sortOrder,
        },
      },
    },
  });
  console.log(designationColumnNameMap.get(orderByColumn));

  return designationColumnNameMap.get(orderByColumn);
}

function designationsearchCondition(searchText: string = "") {
  const searchCondition:DesignationWhere = {
    OR: [
      {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
      {
        sevaKendra: {
          name: {
            contains: searchText,
            mode: "insensitive",
          },
        },
      },
      {
        sevaKendra: {
          district: {
            name: {
              contains: searchText,
              mode: "insensitive",
            },
          },
        },
      },
      {
        sevaKendra: {
          district: {
            state: {
              name: {
                contains: searchText,
                mode: "insensitive",
              },
            },
          },
        },
      },
    ],
  };
  return searchCondition;
}

const designationFilterMapper = (
  columnName: string,
  filterOperation: filterOperationsEnum,
  value: string
) => {
  const designationFilterMap: Map<string, DesignationWhere> =
    new Map();

  const operation =
    filterOperation === filterOperationsEnum.NOTEQUALS
      ? filterOperationsEnum.EQUALS
      : filterOperation;

      designationFilterMap.set(designationColumnNamesEnum.DESIGNATIONS, {
    name: {
      [operation]: value,
      mode: "insensitive",
    },
  });

  designationFilterMap.set(designationColumnNamesEnum.SEVAKENDRANAME, {
    sevaKendra: {
      name: {
        [operation]: value,
        mode: "insensitive",
      },
    },
  });
  designationFilterMap.set(designationColumnNamesEnum.SEVAKENDRADISTRICT, {
    sevaKendra: {
      district: {
          name: {
            [operation]: value,
            mode: "insensitive",
          },
      },
    },
  });
  designationFilterMap.set(designationColumnNamesEnum.SEVAKENDRASTATE, {
    sevaKendra: {
      district: {
        state:{
          name: {
            [operation]: value,
            mode: "insensitive",
          },
        } 
      },
    },
  });

  if (filterOperation === filterOperationsEnum.NOTEQUALS) {
    return {
      NOT: designationFilterMap.get(columnName),
    };
  }
  return designationFilterMap.get(columnName);
};


export { designationColumnNameMapper, designationsearchCondition,designationFilterMapper };
