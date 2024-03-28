import defaults from "../../defaults.js";
import {Query} from "../../types/zodSchemas.js";
import {getTotalRowsDB} from "../../services/database/database.js";
import { Prisma } from "@prisma/client";

async function generateGetResponse(query: Query, data: Prisma.ModelName[]) {
    const total = await getTotalRowsDB("Service");

    const start: number = query.start || defaults.skip;
    const rows: number = query.rows || defaults.take;

    return ({
        data: data,
        total: total,
        rows: (data || []).length,
        reverse: query.reverse,
        orderBy: query.orderBy,
        start: start + 1
    });
}
export default generateGetResponse;