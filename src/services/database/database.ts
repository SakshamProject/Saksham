
import { PrismaClient } from "@prisma/client";
import APIError from "../errors/APIError.js";
import {StatusCodes} from "http-status-codes";

const prisma = new PrismaClient();

async function pingDB(): Promise<void> {
    try {
        const result: { result: number }[] = await prisma.$queryRaw`SELECT 1 + 1 as result`;
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

export default prisma;
export { pingDB };