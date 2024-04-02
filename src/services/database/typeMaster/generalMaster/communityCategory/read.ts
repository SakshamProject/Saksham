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

const getCommunityCategoryByIdDB = async (id: string) => {
    try {
        const communityCategory = await prisma.communityCategory.findFirstOrThrow({
            where: {
                id: id
            }
        })
        return communityCategory
    } catch (error) {
        if (error instanceof Error) {
            throwDatabaseError(error)
        }
    }
}

export { getCommunityCategoryDB, getCommunityCategoryByIdDB }