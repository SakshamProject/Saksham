import { StatusCodes } from 'http-status-codes';
import { CommunityCategory } from '../../../../../types/typeMaster/generalMaster/communityCategorySchema.js';
import APIError from '../../../../errors/APIError.js';
import prisma from '../../../database.js';
import throwDatabaseError from '../../../utils/errorHandler.js';

const deleteCommunityCategoryDB = async (id: string) => {
  try {
    const deletetransaction = await prisma.$transaction(
      async (prismaTransaction) => {
        const dependencies =
          await prismaTransaction.communityCategory.findFirst({
            where: {
              id,
            },
            include: {
              divyang: true,
            },
          });
        if (dependencies && dependencies.divyang.length > 0) {
          throw new APIError(
            'Cannot delete community category with dependencies',
            StatusCodes.BAD_REQUEST
          );
        } else {
          const deletedCommunityCategory: CommunityCategory =
            await prismaTransaction.communityCategory.delete({
              where: {
                id: id,
              },
            });
          return deletedCommunityCategory;
        }
      }
    );
    return deletetransaction;
  } catch (error) {
    if (error instanceof Error) throwDatabaseError(error);
  }
};

export { deleteCommunityCategoryDB };
