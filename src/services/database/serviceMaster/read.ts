import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";
import {Prisma} from "@prisma/client";
import {serviceMasterColumnNameMapper} from "../utils/serviceMaster/serviceMasterColumnNameMapper.js";
import searchTextMapper from "../utils/serviceMaster/searchTextMapper.js";
import defaults from "../../../defaults.js";

async function getServicesDB(
    prismaTransaction: Prisma.TransactionClient,
    orderByColumn: string = "createdAt",
    sortOrder: "asc" | "desc" = "asc",
    skip = defaults.skip,
    take = defaults.take,
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
                    },
                },
            },
            take: take,
            skip: skip,
            orderBy: serviceMasterColumnNameMapper(orderByColumn, sortOrder),
        };

        if (searchText !== "") {
            query.where = searchTextMapper("Service", searchText);
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
async function getServiceTotalDBTransaction(prismaTransaction: Prisma.TransactionClient, searchText = "") {
        try {
            const total = prismaTransaction.service.count({
                where: searchTextMapper("Service", searchText),
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
                serviceType: true,
            },
        };

        const service = await prisma.service.findUniqueOrThrow(query);

        return service;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {getServiceByIdDB};
export {getServicesDB};
export {getServiceTotalDBTransaction}