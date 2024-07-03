import { AuditLogStatusEnum } from '@prisma/client';
import { userForgetPasswordSchemaType } from '../../../types/authentication/authenticationSchema.js';
import { auditLogStatusEnumSchema } from '../../../types/inputFieldSchema.js';
import APIError from '../../errors/APIError.js';
import prisma from '../database.js';
import { getUserStatusDB } from '../users/read.js';
import throwDatabaseError from '../utils/errorHandler.js';
import { StatusCodes } from 'http-status-codes';

async function verifyUser(userName: string, givenPassword: string) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        person: { userName: userName, password: { password: givenPassword } },
      },
      select: {
        person: {
          select: { id: true, userName: true, password: true },
        },
        id: true,
        profilePhotoFileName: true,
        profilePhotoKey: true,
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
    if (user) {
      const currentDate = new Date(Date.now()).toISOString();
      const auditLog = await getUserStatusDB(prisma, user.id, currentDate);
      if (auditLog?.status === AuditLogStatusEnum.ACTIVE) {
        return user;
      } else {
        throw new APIError('User is not active', StatusCodes.BAD_REQUEST);
      }
    }
    return null;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}
async function verifyDivyang(userName: string, givenPassword: string) {
  try {
    const divyangDetails = await prisma.divyangDetails.findFirst({
      where: {
        person: {
          userName: userName,
          password: {
            password: givenPassword,
          },
        },
      },
      select: {
        person: {
          select: {
            id: true,
            userName: true,
          },
        },
        id: true,
        firstName: true,
        lastName: true,
        profilePhotoFileName: true,
        profilePhotoKey: true,
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
    const person = await prisma.person.findFirst({
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
    if (person && person.user) {
      const currentDate = new Date(Date.now()).toISOString();
      const auditLog = await getUserStatusDB(
        prisma,
        person.user.id,
        currentDate
      );
      if (auditLog?.status === AuditLogStatusEnum.ACTIVE) {
        return person;
      } else {
        throw new APIError('User is not active', StatusCodes.BAD_REQUEST);
      }
    }
    return null;
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
