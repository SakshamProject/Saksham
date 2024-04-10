import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function deleteServiceByIdDB(serviceId: string) {
    try {
        const result = await prisma.service.delete({
            where: {
                id: serviceId,
            },
        });

        return result;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {deleteServiceByIdDB};