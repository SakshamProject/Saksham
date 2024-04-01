import prisma from "../../../database.js"
import throwDatabaseError from "../../../utils/errorHandler.js"

const getCommunityCategoryDB = async () => {
    try {
        const communityCategories = await prisma.communityCategory.findMany({})
        return communityCategories
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { getCommunityCategoryDB }