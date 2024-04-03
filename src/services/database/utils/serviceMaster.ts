// Map Column Names to OrderBy Queries
function serviceMasterColumnNameMapper(orderByColumn: string, sortOrder: "asc" | "desc") {
    const serviceMasterColumnNameMap: Map<string, any> = new Map();

    serviceMasterColumnNameMap.set("serviceName", {
        "name": sortOrder
    });

    serviceMasterColumnNameMap.set("createdAt", {
        "createdAt": sortOrder
    })

    serviceMasterColumnNameMap.set("serviceTypeName", {
        "serviceType": {
            "name": sortOrder
        }
    });

    return serviceMasterColumnNameMap.get(orderByColumn);
}

export { serviceMasterColumnNameMapper };