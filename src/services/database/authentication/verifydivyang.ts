import { divyangForgetPasswordSchemaType } from "../../../types/authentication/authenticationSchema.js";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function verifyDivyang(personId: string) {
  try {
    const divyang = await prisma.divyangDetails.findFirst({
      where: {
        personId: personId,
      },
    });
    return divyang;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
}

const verifyDivyangForForgetPassword = async (
  body: divyangForgetPasswordSchemaType
) => {
  try {
    const divyang = await prisma.person.findFirst({
      where: {
        userName: body.userName,
      },
      select: {
        id: true,
        userName: true,
        divyang: {
          select: {
            id: true,
            firstName: true,
            udidCardNumber: true,
          },
          where: {
            udidCardNumber: body.UDIDCardNumber,
          },
        },
      },
    });
    return divyang;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};
export { verifyDivyang, verifyDivyangForForgetPassword };
