import { SevaKendra } from "../../../types/sevaKendra/sevaKendra.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const createSevaKendraDB = async (sevaKendra: SevaKendra) => {
  try {
    console.log(sevaKendra);
    const createdSevaKendra = await prisma.sevaKendra.create({
      data: sevaKendra,
    });
    return createdSevaKendra;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { createSevaKendraDB };
