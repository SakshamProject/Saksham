function designationColumnNameMapper(orderByColumn: string, reverse:string) {
    const sortOrder = reverse;
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
            "district": {
                "name": sortOrder
            }
        }
    });
    console.log(designationColumnNameMap.get(orderByColumn))

    return designationColumnNameMap.get(orderByColumn);
}

export { designationColumnNameMapper };