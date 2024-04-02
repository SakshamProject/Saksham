import { Prisma } from "@prisma/client";
import prisma from "../../../database.js";
import { Taluk } from "../../../../../types/typeMaster/stateMaster/talukSchema.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createTalukDB = async (
  taluk: Prisma.TalukUncheckedCreateInput
): Promise<Taluk | undefined> => {
  try {
    const newTaluk: Taluk = await prisma.taluk.create({
      data: {
        name: taluk.name,
        districtId: taluk.districtId,
      },
    });
    return newTaluk;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createTalukDB };
