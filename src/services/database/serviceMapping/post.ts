import { Prisma } from "@prisma/client";
import throwDatabaseError from "../utils/errorHandler.js";
import { donorSchemaType, postNonSevaKendraFollowUpType, postServiceMappingType } from "../../../types/serviceMapping/serviceMappingSchema.js";

async function createServiceMappingDB(prismaTransaction:Prisma.TransactionClient,dataObject:postServiceMappingType) {
  try {
    
    const serviceMapping = await  prismaTransaction.divyangServiceMapping.create({
      data: dataObject
    })
    return serviceMapping;

  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function createNonSevaKendraFollowUpDB(prismaTransaction:Prisma.TransactionClient,dataObject:postNonSevaKendraFollowUpType) {
  try {

    const NonSevaKendraFollowUp = prismaTransaction.nonSevaKendraFollowUp.create({
      data:dataObject
    });
    return NonSevaKendraFollowUp;
  } catch (err) {
    if (err instanceof Error) {
      throwDatabaseError(err);
    }
  }
}

async function createDonorDB(prismaTransaction:Prisma.TransactionClient,dataObject:donorSchemaType){
try{

    const donor = prismaTransaction.donor.create({
      data:dataObject
    })
    return donor;
}catch(err){
  if (err instanceof Error) {
    throwDatabaseError(err);
}
}
}

export { createServiceMappingDB, createNonSevaKendraFollowUpDB ,createDonorDB};
