import { Prisma, PrismaClient } from "@prisma/client";
import throwDatabaseError from "./utils/errorHandler.js";
import searchTextMapper from "./utils/searchTextMapper.js";

const prisma = new PrismaClient();

async function pingDB(): Promise<void> {
    try {
        await prisma.$queryRaw`SELECT 1 + 1 as result`;
    }
    catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
          }
    }
}


// WARN: This function is for testing only!
// Do not use in code
async function clearTableDB(tables: Prisma.ModelName): Promise<void> {
    try {
        for (const table of tables) {
            // Delete ALL rows of the database
            // await prisma[table].deleteMany({ where: {}});
        }
    }
    catch(error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
          }
    }
}

async function getTotalRowsDB(table: Prisma.ModelName) {
    try {
        const rows = await prisma[table].count();
        return rows;
    }
    catch(error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

async function getTotalRowsWithOrWithoutFilterDB(table: Prisma.ModelName, searchText: string = "") {
    try {
        const count = await prisma[table].count({
            where: searchTextMapper(table, searchText)
        });

        return count;
    }
    catch(error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}
export default prisma;
export { pingDB, clearTableDB, getTotalRowsDB, getTotalRowsWithOrWithoutFilterDB };