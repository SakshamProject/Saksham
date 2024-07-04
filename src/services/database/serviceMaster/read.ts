import prisma from '../database.js';
import throwDatabaseError from '../utils/errorHandler.js';
import { AuditLogStatusEnum, Prisma } from '@prisma/client';
import { serviceMasterColumnNameMapper } from '../utils/serviceMaster/serviceMasterColumnNameMapper.js';
import serviceSearchTextMapper from '../utils/serviceMaster/serviceSearchTextMapper.js';
import defaults from '../../../defaults.js';
import serviceMasterDefaults from './defaults/defaults.js';
import { sortOrderEnum } from '../../../types/getRequestSchema.js';

async function getServicesDB(
  prismaTransaction: Prisma.TransactionClient,
  orderByColumn: string = serviceMasterDefaults.orderBy,
  sortOrder: sortOrderEnum = defaults.sortOrder,
  skip = defaults.skip,
  take = 0,
  searchText = ''
) {
  try {
    const query: Prisma.ServiceFindManyArgs = {
      select: {
        id: true,
        name: true,
        serviceType: {
          select: {
            name: true,
            id: true,
          },
        },
      },
      skip: skip,
      orderBy: {
        // alphabetical
        name: 'asc',
      },
      // orderBy: serviceMasterColumnNameMapper(orderByColumn, sortOrder),
    };

    if (take > 0) {
      query.take = take;
    }

    // if (searchText !== "") {
    //     query.where = searchTextMapper("ServiceType", searchText);
    // }

    const services = await prismaTransaction.service.findMany(query);
    return services;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throwDatabaseError(error);
    }
  }
}

async function getServiceTotalDB(
  prismaTransaction: Prisma.TransactionClient,
  searchText = ''
) {
  try {
    const total = prismaTransaction.service.count({
      // where: searchTextMapper("ServiceType", searchText),
    });
    return total;
  } catch (error) {
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
const getSevaKendrasByServiceIdDB = async (serviceId: string) => {
  try {
    const currentDate = new Date(Date.now()).toISOString();
    const sevaKendras = await prisma.sevaKendra.findMany({
      where: {
        AND: [{ services: { some: { serviceId: serviceId } } }],
      },
      select: {
        id: true,
        name: true,
        district: {
          select: {
            id: true,
            name: true,
            state: {
              select: { id: true, name: true },
            },
          },
        },
        auditLog: {
          select: {
            status: true,
          },
          where: {
            date: {
              lt: currentDate,
            },
          },
          orderBy: {
            date: 'desc',
          },
          take: 1,
        },
      },
    });
    return sevaKendras?.filter(
      (sevaKendra) =>
        sevaKendra.auditLog[0].status === AuditLogStatusEnum.ACTIVE
    );
  } catch (error) {
    throwDatabaseError(error);
  }
};
export { getSevaKendrasByServiceIdDB };
export { getServiceByIdDB };
export { getServicesDB };
export { getServiceTotalDB };
