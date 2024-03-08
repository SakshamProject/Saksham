
import prisma from "../database.js";
import defaults from "../../../defaults.js";
import {query} from "express";

async function getServicesDB(skip= defaults.skip, take= defaults.take) {
    try {
        // TODO: Interfaces

        const query = {
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

        const services = await prisma.service.findMany(query);
        
        return services
    }

    catch (error) {
        console.log(error);
    }
}


async function getServiceByIdDB(id: string, skip= defaults.skip, take= defaults.take) {
    try {
        // TODO: Interfaces

        const query = {
            where: {
                id: {
                    equals: id
                }
            },
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

        const services = await prisma.service.findMany(query);

        return services
    }

    catch (error) {
        console.log(error);
    }
}

export { getServicesDB, getServiceByIdDB }