// import prisma from "../database.js";
// import defaults from "../../../defaults.js";
// import { ContactPerson } from "@prisma/client";
// const getSevaKendrabyIdDB = async (id: string) => {
//   const sevaKendra = await prisma.sevaKendra.findUnique({
//     where: { id: id },

import defaults from "../../../defaults.js";
import { sortOrderEnum } from "../../../types/getRequestSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

//     // select: {
//     //   name: true,
//     //   address: true,
//     //   landLineNumber: true,
//     //   mobileNumber: true,
//     //   startDate: true,

//     //   contactPerson: {
//     //     select: {
//     //       name: true,
//     //       email: true,
//     //       phoneNumber1: true,
//     //       phoneNumber2: true,
//     //     },
//     //   },

//     //   createdAt: true,
//     //   createdBy: true,
//     //   updatedAt: true,
//     //   updatedBy: true,
//     //   isActive: true,

//     //   _count: {
//     //     select: {
//     //       auditLogs: true,
//     //       services: true,
//     //     },
//     //   },

//     //   auditLogs: {
//     //     select: {
//     //       status: true,
//     //       date: true,
//     //       description: true,
//     //     },
//     //   },

//     //   services: {
//     //     select: {
//     //       id: true,
//     //       serviceId: true,
//     //     },
//     //   },

//     //   district: {
//     //     select: {
//     //       name: true,
//     //       state: {
//     //         select: {
//     //           name: true,
//     //         },
//     //       },
//     //     },
//     //   },
//     // },
//     include: {
//       contactPerson: true,
//       _count: true,
//       auditLogs: true,
//       services: true,
//       district: {
//         include: {
//           state: true,
//         },
//       },
//     },
//   });
//   console.log(sevaKendra);
//   return sevaKendra;
// };

const getSevaKendraDB = async (
  prismaTransaction: any,
  orderByColumnAndSortOrder: Object = { name: sortOrderEnum.ascending },
  skip = defaults.skip,
  take = defaults.take
) => {
  try {
    const sevaKendras = await prismaTransaction.sevaKendra.findMany({
      take: take,
      skip: skip,
      select: {
        name: true,
        district: {
          select: {
            name: true,
            state: {
              select: { name: true },
            },
          },
        },
        contactPerson: {
          select: {
            name: true,
            phoneNumber1: true,
          },
        },
      },
      orderBy: orderByColumnAndSortOrder,
    });
    return sevaKendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

const getSevaKendraDBTotal = async (prismaTransaction: any) => {
  try {
    const sevaKendras = await prismaTransaction.sevaKendra.count();
    return sevaKendras;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
// const getContactPersonIdBySevaKendraId = async (
//   sevaKendraId: string
// ): Promise<any> => {
//   const contactPersonId = await prisma.sevaKendra.findFirst({
//     where: {
//       id: sevaKendraId,
//     },
//     select: {
//       contactPerson: {
//         select: {
//           id: true,
//         },
//       },
//     },
//   });
//   return contactPersonId?.contactPerson?.id;
// };

export {
  getSevaKendraDB,
  getSevaKendraDBTotal,
  //   getSevaKendrabyIdDB,
  //   getContactPersonIdBySevaKendraId,
};
