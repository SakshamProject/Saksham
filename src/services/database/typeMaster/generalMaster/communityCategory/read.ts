import defaults from "../../../../../defaults.js";
import { sortOrderEnum } from "../../../../../types/getRequestSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

const getCommunityCategoryDB = async (
    prismaTransaction:any,
    sortOrder: sortOrderEnum |undefined = defaults.sortOrder,
  searchText: string = "",
) => {
  try {
    const communityCategories = await prismaTransaction.communityCategory.findMany({
    
      orderBy: {
        name: sortOrder,
      },
      where: {
        name: {
          contains: searchText,
          mode: "insensitive",
        },
      },
    });

    return communityCategories;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};

const getCommunityCategoryByIdDB = async (id: string) => {
  try {
    const communityCategory = await prisma.communityCategory.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    return communityCategory;
  } catch (error) {
    if (error instanceof Error) {
      throwDatabaseError(error);
    }
  }
};
async function getCommunityCategoryTotal( prismaTransaction: any,searchText:string|undefined){
    try{
      const CommunityCategory:number = await prismaTransaction.CommunityCategory.count(
        {
          where: {
            name: { contains: searchText, mode: "insensitive" },
          },
        }
      )
      return CommunityCategory;
    }catch(err){
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  
  }

export { getCommunityCategoryDB, getCommunityCategoryByIdDB,getCommunityCategoryTotal };
