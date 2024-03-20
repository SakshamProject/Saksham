import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { orderByDirectionEnum } from "../../../controllers/getRequest.schema.js";
const getSevaKendrabyIdDB = async (id: string) => {
  const sevaKendra = await prisma.sevaKendra.findUnique({
    where: { id: id },

    select: {
      name: true,
      address: true,
      landLineNumber: true,
      mobileNumber: true,
      startDate: true,

      contactPerson: {
        select: {
          name: true,
          email: true,
          phoneNumber1: true,
          phoneNumber2: true,
        },
      },

      createdAt: true,
      createdBy: true,
      updatedAt: true,
      updatedBy: true,
      isActive: true,

      _count: {
        select: {
          auditLogs: true,
          services: true,
        },
      },

      auditLogs: {
        select: {
          status: true,
          date: true,
          description: true,
        },
      },

      services: {
        select: {
          id: true,
          serviceId: true,
        },
      },

      district: {
        select: {
          name: true,
          state: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    // include: {

    //   contactPerson: true,
    //   _count: true,
    //   auditLogs: true,
    //   services: true,
    //   district: {
    //     include: {
    //       state: true,
    //     },
    //   },
    // },
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
    select: {
      name: true,
      address: true,
      landLineNumber: true,
      mobileNumber: true,
      startDate: true,

      contactPerson: {
        select: {
          name: true,
          email: true,
          phoneNumber1: true,
          phoneNumber2: true,
        },
      },

      createdAt: true,
      createdBy: true,
      updatedAt: true,
      updatedBy: true,
      isActive: true,

      _count: {
        select: {
          auditLogs: true,
          services: true,
        },
      },

      auditLogs: {
        select: {
          status: true,
          date: true,
          description: true,
        },
      },

      services: {
        select: {
          id: true,
          serviceId: true,
        },
      },

      district: {
        select: {
          name: true,
          state: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    // include: {
    //   contactPerson: true,
    //   _count: true,
    //   auditLogs: true,
    //   services: true,
    //   district: {
    //     include: {
    //       state: true,
    //     },
    //   },
    // },
    orderBy: orderByColumnAndDirection,
  });
  return sevaKendras;
};

export { getSevaKendraDB, getSevaKendrabyIdDB };
