import prisma from '../../database.js';
import throwDatabaseError from '../../utils/errorHandler.js';

const getDisabilityOfDivyangDB = async (divyangId: string) => {
  try {
    const disabilities = await prisma.disabilityOfDivyang.findMany({
      where: {
        divyangId: divyangId,
      },
      include: {
        disabilitySubType: true,
        disabilityType: true,
      },
    });
    return disabilities;
  } catch (error) {
    throwDatabaseError(error);
  }
};
const getDisabilityOfDivyangByIdDB = async (disabilityId: string) => {
  try {
    const disability = await prisma.disabilityOfDivyang.findUnique({
      where: { id: disabilityId },
    });
    return disability;
  } catch (error) {
    throwDatabaseError(error);
  }
};

export { getDisabilityOfDivyangDB, getDisabilityOfDivyangByIdDB };
