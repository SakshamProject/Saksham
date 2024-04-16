import { putServiceMappingSchemaType } from "../../../../types/serviceMapping/serviceMappingSchema.js";
import prisma from "../../database.js";

async function putServiceMappingDBTransaction(
    body: putServiceMappingSchemaType,
    id: string,
    updatedById: string
  ) {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        try {

          if(body.donor){
            const postDonorObject = createPostDonorObject(body.donor);
          }

          const updateDesignationObject = createUpdateDesignationObject(
            body,
            updatedById
          );
  
          const updatedDesignation: Designation | undefined =
            await updateDesignationDB(
              prismaTransaction,
              updateDesignationObject,
              id
            );
  
  
          const exisitingFeatures = await getFeaturesIdByDesignationIdDB(
            prismaTransaction,
            id
          );
  
          const checkedfeatures = body.features;
  
          const { existingFeaturesId, checkedFeaturesId } = retrieveFeatureIds(
            exisitingFeatures,
            checkedfeatures
          );
  
          await createCheckedFeaturesOnDesignations(
            prismaTransaction,
            checkedFeaturesId,
            existingFeaturesId,
            id,
            updatedById
          );
  
          await deleteUncheckedDesignations(
            prismaTransaction,
            existingFeaturesId,
            checkedFeaturesId,
            id
          );
  
          const status = await getDesignationStatus(prismaTransaction,id)
  
         if (status !== body.auditLog.status){
  
          const designationAuditLogObject = createDesignationAuditLog(
            id,
            body.auditLog.status,
            body.auditLog.date,
            body.auditLog.description
          );
          const designationAuditLog = await createDesignationAuditLogDB(
            prismaTransaction,
            designationAuditLogObject
          );
  
         }
  
          return id;
        } catch (error) {
          if (error instanceof Error) throwDatabaseError(error);
        }
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
        maxWait: 50000,
        timeout: 50000,
      }
    );
    return transaction;
  }
  
  export { putServiceMappingDBTransaction };
  