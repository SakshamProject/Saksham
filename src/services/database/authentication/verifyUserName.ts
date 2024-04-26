import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function verifyUserName(userName: string) {
  try {
    const person = await prisma.person.findUnique({
      where: {
        userName: userName,
      },
      include: {
        user: true,
        password: true,
      },
    });
    return person;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}
const getUserByIdAuthDB = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({
      // select: usersDefaults.select,
      include: {
        auditLog: true,
        createdBy: true,
        updatedBy: true,
        person: {
          select: {
            userName: true,
          },
        },
        designation: {
          select: {
            id: true,
            name: true,
            sevaKendra: {
              select: {
                id: true,
                name: true,
                district: {
                  select: {
                    id: true,
                    name: true,
                    state: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      where: {
        id: id,
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
export { verifyUserName, getUserByIdAuthDB };
