import { ContactPerson, SevaKendra } from "@prisma/client";
import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { skip } from "node:test";

const getSevaKendraDB = async () => {
  const sevaKendra = await prisma.sevaKendra.findMany({
    take: defaults.take,
    skip: defaults.skip,
    orderBy: {
      name: "asc",
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
