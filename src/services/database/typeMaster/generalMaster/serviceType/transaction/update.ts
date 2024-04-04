import { Prisma } from "@prisma/client";
import { retrieveServicesId } from "../../../../../../controllers/typeMaster/generalMaster/serviceType/put.js";
import { createUpdateServiceTypeObject } from "../../../../../../dto/typeMaster/generalMaster/serviceType/put.js";
import { getServiceTypeWithServiceSchema, updateServiceTypeRequestSchema, updateServiceTypeRequestSchemaType } from "../../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { createCheckedServices } from "../create.js";
import { deleteUncheckedServices } from "../delete.js";
import { getServiceByServiceTypeIdDB, getServiceTypeByIdDB } from "../read.js";
import { updateServiceTypeDB } from "../update.js";

async function putServiceTypeDBTransaction(body:updateServiceTypeRequestSchemaType){
    const transaction = await prisma.$transaction(
        async (prismaTransaction) => {
          try {

       

        const updateServiceTypeObject = createUpdateServiceTypeObject(prismaTransaction,body);

        const updatedServiceType:getServiceTypeWithServiceSchema|undefined = await updateServiceTypeDB(prismaTransaction,updateServiceTypeObject,body.id);

        const existingServices = await getServiceByServiceTypeIdDB(prismaTransaction,body.id);

        const existingServicesId:string[]|undefined = retrieveServicesId(existingServices);

        const services = body.serviceName;

        const checkedServicesId:string[] = await createCheckedServices(prismaTransaction,services,updatedServiceType?.id)

       await deleteUncheckedServices(prismaTransaction,existingServicesId,checkedServicesId );

       const result = await getServiceTypeByIdDB(prismaTransaction,updatedServiceType?.id)
       return result;
            
          } catch (error) {
            if (error instanceof Error) throwDatabaseError(error);
          }
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
          maxWait: 5000,
          timeout: 10000,
        }
      );
      return transaction;
}

export{putServiceTypeDBTransaction};