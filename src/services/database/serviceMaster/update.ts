import {Prisma} from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function updateServiceDB(
    serviceUpdate: Prisma.ServiceUncheckedUpdateInput,
    serviceId: string
) {
    try {
        const service = await prisma.service.update({
            where: {
                id: serviceId,
            },
            data: serviceUpdate,
        });
        return service;
    } catch (error) {
            throwDatabaseError(error);
    }
}

export {updateServiceDB};