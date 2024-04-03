import defaults from "../../defaults.js";

// TODO: Convert data:any to appropriate type
function generateGetResponse(query: any, data:any, total: number) {

    const start: number = query.start || defaults.skip;
    // const rows: number = query.rows || defaults.take;


    return ({
        data: data,
        total: total,
        rows: (data || []).length,
        sortOrder: query.sortOrder,
        orderBy: query.orderBy,
        start: start + 1
    });
}

export default generateGetResponse;