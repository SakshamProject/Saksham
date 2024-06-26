import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function deleteServiceTypeDB(id: string) {
  try {
    const deletedService = await prisma.serviceType.delete({
      where: {
        id: id,
      },
      include:{
        service:true
      }
    });
    return deletedService;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function deleteServiceDB(prismaTransaction:any,id: string) {
  try {
    const deletedService = await prismaTransaction.service.delete({
      where: {
        id: id,
      },
    });
    console.log("delete db layer")
    console.log(deletedService)
    return deletedService;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function deleteUncheckedServices(
  prismaTransaction: any,
  exisitingServicesId: string[],
  updatedServicesId: string[]
) {
  try {
    for (let exisitingId of exisitingServicesId) {
      if (!updatedServicesId.includes(exisitingId)) {
        const deletedService = await deleteServiceDB(prismaTransaction,exisitingId);
      }
    }
  } catch (err) {
    throw err;
  }
}

export { deleteServiceTypeDB, deleteServiceDB, deleteUncheckedServices };
