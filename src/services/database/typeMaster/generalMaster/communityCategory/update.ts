import { CommunityCategory } from "../../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const updateCommunityCategoryDB = async (communityCategory: CommunityCategory, id: string): Promise<CommunityCategory | undefined> => {
    try {
        const updatedCommunityCategory = await prisma.communityCategory.update({
            where: {
                id: id,
            },
            data: {
                name: communityCategory.name
            }
        })
        return updatedCommunityCategory
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { updateCommunityCategoryDB }