import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

const verifySuperAdmin = async (userName: string, hashedpassword: string) => {
  try {
    const admin = await prisma.superAdmin.findFirst({
      where: {
        person: {
          userName: userName,
          password: {
            password: hashedpassword,
          },
        },
      },
      include: {
        person: true,
      },
    });
    return admin;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export default verifySuperAdmin;
