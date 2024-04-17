import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import {serviceMasterColumnNameMapper} from "../utils/serviceMaster/serviceMasterColumnNameMapper.js";
import serviceSearchTextMapper from "../utils/serviceMaster/serviceSearchTextMapper.js";
import defaults from "../../../defaults.js";
import serviceMasterDefaults from "./defaults/defaults.js";
import {sortOrderEnum} from "../../../types/getRequestSchema.js";

async function getServicesDB(
    prismaTransaction: Prisma.TransactionClient,
    orderByColumn: string = serviceMasterDefaults.orderBy,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    skip = defaults.skip,
    take = 0,
    searchText = ""
) {
    try {
        const query: Prisma.ServiceFindManyArgs = {
            select: {
                id: true,
                name: true,
                serviceType: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            },
            skip: skip,
            orderBy: { // alphabetical
                name: "asc"
            }
            // orderBy: serviceMasterColumnNameMapper(orderByColumn, sortOrder),
        };

        if ( (take > 0) ) {
            query.take = take;
        }

        if (searchText !== "") {
            query.where = serviceSearchTextMapper("ServiceType", searchText);
        }

        const services = await prismaTransaction.service.findMany(query);
        return services;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throwDatabaseError(error);
        }
    }
}

async function getServiceTotalDB(prismaTransaction: Prisma.TransactionClient, searchText = "") {
        try {
            const total = prismaTransaction.serviceType.count({
                where: serviceSearchTextMapper("ServiceType", searchText),
            });
            return total;
        }
        catch(error) {
            if (error instanceof Error) {
                throwDatabaseError(error);
            }
        }
}

async function getServiceByIdDB(id: string) {
    try {
        const query = {
            where: {
                id: id,
            },
            include: {
                service: true,
            },
        };

        const service = await prisma.serviceType.findUniqueOrThrow(query);

        return service;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {getServiceByIdDB};
export {getServicesDB};
export {getServiceTotalDB}