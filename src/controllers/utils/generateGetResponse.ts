import defaults from "../../defaults.js";

// TODO: Convert data:any to appropriate type
function generateGetResponse(query: any, data: any, total: number) {

    const start: number = query.start || defaults.skip;
    // const rows: number = query.rows || defaults.take;


    return ({
        data: data,
        request: {
            sortOrder: query.sortOrder,
            orderBy: query.orderBy,
            start: start + 1,
            searchText: query.searchText,
        },
        total: total,
        count: (data || []).length,
    });
}

export default generateGetResponse;