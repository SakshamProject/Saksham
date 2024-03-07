import { ContactPerson, SevaKendra } from "@prisma/client";
import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { skip } from "node:test";

const getSevaKendraDB = async (): Promise<SevaKendra[]> => {
  const sevaKendra = await prisma.sevaKendra.findMany({
    take: defaults.take,
    skip: defaults.skip,
    orderBy: {
      name: "asc",
    },
  });
  return sevaKendra;
};

const getContactPersonDB = async (): Promise<ContactPerson[]> => {
  const contactPerson = await prisma.contactPerson.findMany({
    take: defaults.take,
    skip: defaults.skip,
    orderBy: {
      name: "asc",
    },
  });
  return contactPerson;
};

export { getContactPersonDB, getSevaKendraDB };
