import prisma from "../database.js";
import defaults from "../../../defaults.js";

const getSevaKendraDB = async () => {
  const sevaKendra = await prisma.sevaKendra.findMany({
    take: defaults.take,
    skip: defaults.skip,

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
