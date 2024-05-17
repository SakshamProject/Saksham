import { userForgetPasswordSchemaType } from "../../../types/authentication/authenticationSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function verifyUser(userName: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        person: { userName: userName },
      },
      select: {
        person: {
          select: { id: true, userName: true, password: true },
        },
        id: true,
        profilePhotoFile: true,
        profilePhotoFileName: true,
        divyangServiceMapping: true,
        designation: {
          select: {
            id: true,
            name: true,
            features: {
              select: {
                feature: {
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
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}
async function verifyDivyang(userName: string) {
  try {
    const divyangDetails = await prisma.divyangDetails.findFirst({
      where: {
        person: { userName: userName },
      },
      select: {
        person: {
          select: {
            password: true,
            id: true,
            userName: true,
          },
        },
        id: true,
        firstName: true,
        lastName: true,
        profilePhotoFileName: true,
        profilePhotoFile: true,
      },
    });
    return divyangDetails;
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
            sevaKendraId: true,
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
const verifyUserForForgetPassword = async (
  body: userForgetPasswordSchemaType
) => {
  try {
    const user = await prisma.person.findFirst({
      where: {
        AND: [
          {
            userName: body.userName,
          },
          {
            user: {
              contactNumber: body.contactNumber,
            },
          },
        ],
      },
      select: {
        id: true,
        userName: true,
        user: {
          select: {
            id: true,
            firstName: true,
            contactNumber: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export {
  verifyUser,
  getUserByIdAuthDB,
  verifyUserForForgetPassword,
  verifyDivyang,
};
