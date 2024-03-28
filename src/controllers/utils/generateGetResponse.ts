import defaults from "../../defaults.js";
import {Query} from "../../types/zodSchemas.js";
import {getTotalRowsDB} from "../../services/database/database.js";
import { Prisma } from "@prisma/client";

// TODO: Convert data:any to appropriate type
async function generateGetResponse(query: Query, data:any, total: number) {

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