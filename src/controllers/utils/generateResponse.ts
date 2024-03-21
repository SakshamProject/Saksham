import defaults from "../../defaults.js";
import {Query} from "../schemas/zodSchemas.js";
import {getTotalRowsDB} from "../../services/database/database.js";
import { results } from "../../types/custom.js";

async function generateResponse(query: Query, data: results) {
    const total = await getTotalRowsDB("Service");

    const start: number = query.start || defaults.skip;
    const rows: number = query.rows || defaults.take;

    let next: {start: number, rows: number} | null = null;
    let prev: {start: number, rows: number} | null = null;

    if (start + rows < total) {
        next = {
            start: start + rows + 1,
            rows: rows
        }
    }

    if (start !== 0) {
        if (start - rows > 0) {
            prev = {
                start: start - rows + 1,
                rows: rows
            }
        }
        else {
            prev = {
                start: 0,
                rows: rows
            }
        }
    }

    return ({
        data: data,
        total: total,
        rows: (data || []).length,
        reverse: query.reverse,
        orderBy: query.orderBy,
        start: start + 1,
        next: next,
        prev: prev,
    });
}

export default generateResponse;