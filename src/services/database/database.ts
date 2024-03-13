
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function pingDB(): Promise<void> {
    try {
        await prisma.$queryRaw`SELECT 1 + 1 as result`;
    }
    catch (error) {
        throw error;
    }
}

// WARN: This function is for testing only!
// Do not use in code
async function clearTableDB(tables: string[]): Promise<void> {
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

export { pingDB, clearTableDB };