
import prisma from "../database.js";
import defaults from "../../../defaults.js";

async function getServicesDB(skip= defaults.skip, take= defaults.take) {
    try {
        // TODO: Interfaces
        const services = await prisma.service.findMany(
            {
                take: take,
                skip: skip,
                include: {
                    subType: {
                        include: {
                            serviceType: true
                        }
                    }
                }
            }
        );
        
        return services
    }

    catch (error) {
        console.log(error);
    }
}

export { getServicesDB }