import { Prisma } from "@prisma/client";
import { CommunityCategory } from "../../../../../types/typeMaster/generalMaster/communityCategorySchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const createCommunityCategoryDB = async (communityCategory: Prisma.CommunityCategoryUncheckedCreateInput): Promise<CommunityCategory | undefined> => {
    try {
        const createdCommunityCategory = await prisma.communityCategory.create({
            data: {
                name: communityCategory.name,
                id: communityCategory.id
            },
        });
        return createdCommunityCategory
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { createCommunityCategoryDB }