import { orderByDirectionEnum } from "../../../../../controllers/getRequest.schema.js";
import defaults from "../../../../../defaults.js";
import {
  getSelectedServiceTypeWithServiceSchema,
  getServiceTypeWithServiceSchema,
} from "../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { serviceTypeColumnNameMapper } from "../../../../utils/typeMaster/generalMaster/serviceType/serviceType.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";


async function getServiceTypeByIdDB(id: string | undefined) {

  try {
    const serviceType: getServiceTypeWithServiceSchema | null =
      await prisma.serviceType.findUnique({
        where: {
          id: id,
        },
        include: {
          service: true,
        },
      });
    return serviceType;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function getServiceTypeCount() {

  const count: number = await prisma.serviceType.count();
  return count;
}

async function getServiceTypeDB(
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumn: string = "",
  orderByDirection: orderByDirectionEnum = orderByDirectionEnum.ascending,
  searchText: string = ""
) {
  try {
    const results = await prisma.serviceType.findMany({
      skip: skip,
      take: take,
      include: {
        service: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        name:orderByDirection
      },
      where: {
        OR: [
          {
            name: {
              contains: searchText,
            },
          },
          {
            service: {
              some: {
                name: {
                  contains: searchText,
                },
              },
            },
          },
        ],
      },
    });

    return results;
  } catch (err) {
    return err;
  }
}

export { getServiceTypeByIdDB, getServiceTypeDB, getServiceTypeCount };
