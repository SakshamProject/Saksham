import { orderByDirectionEnum } from "../../../types/getRequestSchema.js";

const sevaKendraColumnNameMapper = (
  orderByColumn: string = "name",
  orderByDirection: orderByDirectionEnum = orderByDirectionEnum.ascending
) => {
  const sevaKendraColumnNameMap: Map<string, any> = new Map();

  sevaKendraColumnNameMap.set("name", {
    name: orderByDirection,
  });

  sevaKendraColumnNameMap.set("district", {
    district: {
      name: orderByDirection,
    },
  });

  sevaKendraColumnNameMap.set("state", {
    district: {
      state: {
        name: orderByDirection,
      },
    },
  });

  return sevaKendraColumnNameMap.get(orderByColumn);
};

export { sevaKendraColumnNameMapper };
