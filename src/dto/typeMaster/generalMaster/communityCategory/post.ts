import { Prisma } from "@prisma/client";
import { CommunityCategory } from "../../../../types/typeMaster/generalMaster/communityCategorySchema.js";

const createCommunityCategoryDBObject = (communityCategory: CommunityCategory): Prisma.CommunityCategoryUncheckedCreateInput => {
    const newCommunityCategory: Prisma.CommunityCategoryUncheckedCreateInput = {
        name: communityCategory.name
    }
    return newCommunityCategory
}

export { createCommunityCategoryDBObject }