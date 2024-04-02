// Map Column Names to OrderBy Queries
function serviceMasterColumnNameMapper(orderByColumn: string, sortOrder: "asc" | "desc") {
    const serviceMasterColumnNameMap: Map<string, any> = new Map();

    serviceMasterColumnNameMap.set("serviceName", {
        "name": sortOrder
    });

    serviceMasterColumnNameMap.set("serviceSubTypeName", {
        "subType": {
            "name": sortOrder
        }
    });

    serviceMasterColumnNameMap.set("serviceTypeName", {
        "subType": {
            "serviceType": {
                "name": sortOrder
            }
        }
    });

    return serviceMasterColumnNameMap.get(orderByColumn);
}

export { serviceMasterColumnNameMapper };