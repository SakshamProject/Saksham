import { DivyangServiceMapping, Donor, Prisma, StatusEnum } from "@prisma/client";
import { createPostDonorObject, createupdateServiceMappingCompletionDBObject, createupdateServiceMappingPendingDBObject } from "../../../../dto/serviceMapping/put.js";
import { donorSchemaType, putServiceMappingSchemaType } from "../../../../types/serviceMapping/serviceMappingSchema.js";
import prisma from "../../database.js";
import { createDonorDB } from "../post.js";
import { updateServiceMappingDB } from "../put.js";
import throwDatabaseError from "../../utils/errorHandler.js";

async function putServiceMappingDBTransaction(
    body: putServiceMappingSchemaType,
    id: string,
    updatedById: string
  ) {
    const transaction = await prisma.$transaction(
      async (prismaTransaction) => {
        try {

          if(body.isCompleted===StatusEnum.COMPLETED){

            if(body.donor){
              
              const postDonorDBObject:donorSchemaType = createPostDonorObject(body.donor);
              const donor:Donor|undefined = await createDonorDB(prismaTransaction,postDonorDBObject);
              const updateServiceMappingDBObject = createupdateServiceMappingCompletionDBObject(body,updatedById,donor?.id)
              const serviceMapping = await updateServiceMappingDB(prismaTransaction,updateServiceMappingDBObject,id)

            }else{

              const updateServiceMappingDBObject = createupdateServiceMappingCompletionDBObject(body,updatedById)
              console.log(`[+]updateServiceMappingDBObject`,updateServiceMappingDBObject)
              const serviceMapping = await updateServiceMappingDB(prismaTransaction,updateServiceMappingDBObject,id)
              console.log(`[+]serviceMapping`,serviceMapping)

            }
          }
          else{
            if(body.isFollowUpRequired){

              const updateServiceMappingDBObject = createUpdateServiceMappingWithFollowUpDBObject(body,updatedById)
              const serviceMapping :DivyangServiceMapping|undefined= await updateServiceMappingDB(prismaTransaction,updateServiceMappingDBObject,id)
              
              const followUpDBObject = createFollowUpDBOject(body,serviceMapping?.id);
              const followUp = createFollowUpDB(prismaTransaction,followUpDBObject);

            }else if (body.isNonSevaKendraFollowUpRequired){

            }else{
              const updateSeviceMappingDBObject = createupdateServiceMappingPendingDBObject(body,updatedById);
              const serviceMapping=  await updateServiceMappingDB(prismaTransaction,updateSeviceMappingDBObject,id)
            }
          }

         

        //   const updateDesignationObject = createUpdateDesignationObject(
        //     body,
        //     updatedById
        //   );
  
        //   const updatedDesignation: Designation | undefined =
        //     await updateDesignationDB(
        //       prismaTransaction,
        //       updateDesignationObject,
        //       id
        //     );
  
  
        //   const exisitingFeatures = await getFeaturesIdByDesignationIdDB(
        //     prismaTransaction,
        //     id
        //   );
  
        //   const checkedfeatures = body.features;
  
        //   const { existingFeaturesId, checkedFeaturesId } = retrieveFeatureIds(
        //     exisitingFeatures,
        //     checkedfeatures
        //   );
  
        //   await createCheckedFeaturesOnDesignations(
        //     prismaTransaction,
        //     checkedFeaturesId,
        //     existingFeaturesId,
        //     id,
        //     updatedById
        //   );
  
        //   await deleteUncheckedDesignations(
        //     prismaTransaction,
        //     existingFeaturesId,
        //     checkedFeaturesId,
        //     id
        //   );
  
        //   const status = await getDesignationStatus(prismaTransaction,id)
  
        //  if (status !== body.auditLog.status){
  
        //   const designationAuditLogObject = createDesignationAuditLog(
        //     id,
        //     body.auditLog.status,
        //     body.auditLog.date,
        //     body.auditLog.description
        //   );
        //   const designationAuditLog = await createDesignationAuditLogDB(
        //     prismaTransaction,
        //     designationAuditLogObject
        //   );
  
        //  }
  
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
  