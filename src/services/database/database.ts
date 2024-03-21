
import APIError from "../errors/APIError.js";
import {StatusCodes} from "http-status-codes";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function pingDB(): Promise<void> {
    try {
        await prisma.$queryRaw`SELECT 1 + 1 as result`;
    }
    catch (error) {
        throw new APIError(
            "There was an error connecting to the database",
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    "DatabaseConnectivityError",
                    1001,
                    "S"
            );
    }
}


// WARN: This function is for testing only!
// Do not use in code
async function clearTableDB(tables: Prisma.ModelName[]): Promise<void> {
    try {
        for (const table of tables) {
            // Delete ALL rows of the database
            await prisma[table].deleteMany({ where: {}});
        }
    }
    catch(error) {
        console.log(error);
    }
}

async function getTotalRowsDB(table: Prisma.ModelName) {
    try {
        const rows = await prisma[table].count();
        return rows;
    }
    catch(error) {
        console.log(error);
    }
}

export default prisma;
export { pingDB, clearTableDB, getTotalRowsDB };