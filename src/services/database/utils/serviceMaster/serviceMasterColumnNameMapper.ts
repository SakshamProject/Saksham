// Map Column Names to OrderBy Queries
function serviceMasterColumnNameMapper(orderByColumn: string, sortOrder: "asc" | "desc") {
    const serviceMasterColumnNameMap: Map<string, any> = new Map();

    serviceMasterColumnNameMap.set("serviceTypeName", {
        "name": sortOrder
    });

    serviceMasterColumnNameMap.set("createdAt", {
        "createdAt": sortOrder
    });

    serviceMasterColumnNameMap.set("updatedAt", {
        "updatedAt": sortOrder
    });

    return serviceMasterColumnNameMap.get(orderByColumn);
}

export {serviceMasterColumnNameMapper};