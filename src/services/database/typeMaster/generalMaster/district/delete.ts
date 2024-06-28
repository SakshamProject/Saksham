import { District } from '../../../../../types/typeMaster/generalMaster/districtSchema.js';
import APIError from '../../../../errors/APIError.js';
import prisma from '../../../database.js';
import throwDatabaseError from '../../../utils/errorHandler.js';

const deleteDistrictDB = async (id: string): Promise<District | undefined> => {
  try {
    const deleteTransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependency = await prismaTransaction.district.findFirst({
          where: { id },
          include: {
            Corporations: true,
            MLAConstituencies: true,
            MPConstituencies: true,
            Municipalities: true,
            PanchayatUnions: true,
            Taluks: true,
            TownPanchayats: true,
            divyangCommunication: true,
            divyangPermanant: true,
            sevakendra: true,
          },
        });
        if (
          dependency &&
          (dependency.Corporations.length > 0 ||
            dependency.MLAConstituencies.length > 0 ||
            dependency.MPConstituencies.length > 0 ||
            dependency.Municipalities.length > 0 ||
            dependency.PanchayatUnions.length > 0 ||
            dependency.Taluks.length > 0 ||
            dependency.TownPanchayats.length > 0 ||
            dependency.divyangCommunication.length > 0 ||
            dependency.divyangPermanant.length > 0 ||
            dependency.sevakendra.length > 0)
        ) {
          throw new APIError('District has dependencies');
        } else {
          const deletedDistrict: District =
            await prismaTransaction.district.delete({
              where: {
                id: id,
              },
            });
          return deletedDistrict;
        }
      }
    );
    return deleteTransaction;
  } catch (error) {
    throwDatabaseError(error);
  }
};

export { deleteDistrictDB };
