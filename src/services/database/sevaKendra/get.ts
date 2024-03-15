import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { orderBySevaKendraColumns } from "../../../models/sevaKendra/orderBy.js";

const getSevaKendraDB = async (orderByColumn: any) => {
  const defaultOrderBy: orderBySevaKendraColumns =
    orderBySevaKendraColumns.name; // Provide a default value
  const selectedOrderBy = orderByColumn || defaultOrderBy;
  const sevaKendra = await prisma.sevaKendra.findMany({
    take: defaults.take,
    skip: defaults.skip,
    orderBy: {
      [selectedOrderBy]: "asc",
    },
    select: {
      name: true,
      districtId: true,
      contactPerson: {
        select: {
          id: false,
          name: true,
          phoneNumber1: true,
        },
      },
    },
  });
  return sevaKendra;
};

export { getSevaKendraDB };
