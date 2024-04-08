import { PrismaClient } from "@prisma/client";
import throwDatabaseError from "./utils/errorHandler.js";

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


export default prisma;
export { pingDB };