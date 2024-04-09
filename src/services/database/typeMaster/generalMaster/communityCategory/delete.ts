import { CommunityCategory } from "../../../../../types/typeMaster/generalMaster/communityCategorySchema.js"
import prisma from "../../../database.js"
import throwDatabaseError from "../../../utils/errorHandler.js";

const deleteCommunityCategoryDB = async (id: string): Promise<CommunityCategory | undefined> => {
    try {
         const deletedCommunityCategory: CommunityCategory = await prisma.communityCategory.delete({
            where: {
                id: id
            }
         })
         return deletedCommunityCategory;
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { deleteCommunityCategoryDB }