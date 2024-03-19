import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { orderByDirectionEnum } from "../../../controllers/getRequest.schema.js";
const getSevaKendrabyIdDB = async (id: string) => {
  const sevaKendra = await prisma.sevaKendra.findUnique({
    where: { id: id },

    include: {
      contactPerson: true,
      _count: true,
      auditLogs: true,
      services: true,
      district: {
        include: {
          state: true,
        },
      },
    },
  });
  console.log(sevaKendra);
  return sevaKendra;
};

const getSevaKendraDB = async (
  orderByColumnAndDirection: Object = { name: orderByDirectionEnum.ascending },
  skip = defaults.skip,
  take = defaults.take
) => {
  const sevaKendras = await prisma.sevaKendra.findMany({
    take: take,
    skip: skip,

    include: {
      contactPerson: true,
      _count: true,
      auditLogs: true,
      services: true,
      district: {
        include: {
          state: true,
        },
      },
    },
    orderBy: orderByColumnAndDirection,
  });
  return sevaKendras;
};

export { getSevaKendraDB, getSevaKendrabyIdDB };
