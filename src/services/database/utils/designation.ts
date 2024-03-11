function designationColumnNameMapper(orderByColumn: string, reverse: boolean) {
    const sortOrder = reverse ? "desc" : "asc";
    const designationColumnNameMap: Map<string, any> = new Map();

    designationColumnNameMap.set("designationName", {
        "name": sortOrder
    });

    designationColumnNameMap.set("sevaKendraName", {
        "sevaKendra": {
            "name": sortOrder
        }
    });

   designationColumnNameMap.set("sevaKendraDistrict", {
        "sevaKendra": {
            "serviceType": {
                "name": sortOrder
            }
        }
    });

    return designationColumnNameMap.get(orderByColumn);
}

export { designationColumnNameMapper };