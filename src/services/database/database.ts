
import { PrismaClient } from "@prisma/client";
import {promise} from "zod";

const prisma = new PrismaClient();

async function pingDB(): Promise<void> {
    await prisma.$connect()
    try {
        const result: { result: number }[] = await prisma.$queryRaw`SELECT 1 + 1 as result`;
    }
    catch (error) {
        throw error;
    }
}

export { pingDB };