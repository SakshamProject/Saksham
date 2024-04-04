import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function deleteDisabilityTypeDB(id: string) {
    try {
      const deleteddisabilityType= await prisma.disabilityType.delete({
        where: {
          id: id,
        },
        include:{
          disability:true
        }
      });
      return deleteddisabilityType;
    } catch (err) {
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  }
  
  async function deleteDisabilitySubTypeDB(id: string) {
    try {
      const deletedDisabilitySubType = await prisma.disabilitySubType.delete({
        where: {
          id: id,
        },
      });
      return deletedDisabilitySubType;
    } catch (err) {
      if (err instanceof Error) {
        throwDatabaseError(err);
      }
    }
  }

  async function deleteUncheckedDisabilitySubTypes(
    prismaTransaction: any,
    exisitingDisabilitySubTypesId: string[],
    updatedDisabilitySubTypesIdId: string[]
  ) {
    try {
      for (let exisitingId of exisitingDisabilitySubTypesId) {
        if (!updatedDisabilitySubTypesIdId.includes(exisitingId)) {
          const deletedDisabilitySubTypesIdId = await deleteDisabilitySubTypeDB(exisitingId);
        }
      }
    } catch (err) {
      throw err;
    }
  }


  export {deleteDisabilityTypeDB,deleteDisabilitySubTypeDB,deleteUncheckedDisabilitySubTypes};