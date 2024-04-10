// Map Column Names to OrderBy Queries
function serviceMasterColumnNameMapper(orderByColumn: string, sortOrder: "asc" | "desc") {
    const serviceMasterColumnNameMap: Map<string, any> = new Map();

    serviceMasterColumnNameMap.set("serviceTypeName", {
        service: {
            "name": sortOrder
        }
    });

    serviceMasterColumnNameMap.set("createdAt", {
        "createdAt": sortOrder
    })

    serviceMasterColumnNameMap.set("serviceName", {
        "name": sortOrder
    });

    return serviceMasterColumnNameMap.get(orderByColumn);
}

export { serviceMasterColumnNameMapper };