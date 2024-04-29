import { updatePasswordSchemaType } from "../../../types/authentication/authenticationSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const updatePasswordDB = async (id: string, hashedPassword: string) => {
  try {
    const password = await prisma.person.update({
      where: {
        id: id,
      },
      data: {
        password: {
          update: {
            data: {
              password: hashedPassword,
            },
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export default updatePasswordDB;
