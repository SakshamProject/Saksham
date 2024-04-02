import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";


const serviceTypeColumnNameMapper = (
  orderByColumn: string = "name",
  orderByDirection: orderByDirectionEnum = orderByDirectionEnum.ascending
) => {
  const serviceTypeColumnNameMap: Map<string, any> = new Map();

  serviceTypeColumnNameMap.set("name", {
    name: orderByDirection,
  });

  serviceTypeColumnNameMap.set("serviceName", {
    service: {
      name: orderByDirection,
    },
  });

  
  return serviceTypeColumnNameMap.get(orderByColumn);
};

export { serviceTypeColumnNameMapper };
