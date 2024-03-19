// Map Column Names to OrderBy Queries
function sevaKendraColumnNameMapper(orderByColumn: string, reverse: boolean) {
    const sortOrder = reverse ? "desc" : "asc";
    const sevaKendraColumnNameMap: Map<string, any> = new Map();

    sevaKendraColumnNameMap.set("name", {
        "name": sortOrder
    });

    sevaKendraColumnNameMap.set("serviceSubTypeName", {
        "subType": {
            "name": sortOrder
        }
    });

    sevaKendraColumnNameMap.set("serviceTypeName", {
        "subType": {
            "serviceType": {
                "name": sortOrder
            }
        }
    });

    return sevaKendraColumnNameMap.get(orderByColumn);
}

export { sevaKendraColumnNameMapper };