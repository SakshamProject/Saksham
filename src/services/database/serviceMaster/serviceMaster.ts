
import prisma from "../database.js";
import defaults from "../../../defaults.js";
import {query} from "express";
import {serviceMasterColumnNameMapper} from "../utils/serviceMaster.js";

async function getServicesDB(orderByColumn: string = "serviceName", reverse: boolean = false, skip= defaults.skip, take= defaults.take) {
    // TODO: Default orderBy Value?
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
            },
            orderBy: serviceMasterColumnNameMapper(orderByColumn, reverse)
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

async function createServiceByIdDB(serviceName: string, serviceSubTypeID: string) {

    // When adding using ID, serviceSubType is enough
    const service = await prisma.service.create({
        data: {
            "name": serviceName,
            "subTypeId": serviceSubTypeID
        }
    });

    return service;
}

async function deleteServiceByIdDB(serviceId: string) {

    const result = await prisma.service.delete({
        where: {
            id: serviceId,
        }
    });

    if (!result) {
        // Row was not found
    }

    return result;
}

export { getServicesDB, getServiceByIdDB, createServiceByIdDB, deleteServiceByIdDB }