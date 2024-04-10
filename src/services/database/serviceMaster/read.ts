import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import {serviceMasterColumnNameMapper} from "../utils/serviceMaster/serviceMasterColumnNameMapper.js";
import searchTextMapper from "../utils/serviceMaster/searchTextMapper.js";
import defaults from "../../../defaults.js";
import serviceMasterDefaults from "./defaults/defaults.js";
import {sortOrderEnum} from "../../../types/getRequestSchema.js";

async function getServicesDB(
    prismaTransaction: Prisma.TransactionClient,
    orderByColumn: string = serviceMasterDefaults.orderBy,
    sortOrder: sortOrderEnum = defaults.sortOrder,
    skip = defaults.skip,
    take = defaults.take,
    searchText = ""
) {
    try {
        const query: Prisma.ServiceTypeFindManyArgs = {
            select: serviceMasterDefaults.select,
            take: take,
            skip: skip,
            orderBy: serviceMasterColumnNameMapper(orderByColumn, sortOrder),
        };

        if (searchText !== "") {
            query.where = searchTextMapper("ServiceType", searchText);
        }

        const services = await prismaTransaction.serviceType.findMany(query);
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
                where: searchTextMapper("ServiceType", searchText),
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