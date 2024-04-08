import { Prisma } from "@prisma/client";
import { retrieveServicesId } from "../../../../../../controllers/typeMaster/generalMaster/serviceType/put.js";
import { createUpdateServiceTypeObject } from "../../../../../../dto/typeMaster/generalMaster/serviceType/put.js";
import {
  getServiceTypeWithServiceSchema,
  updateServiceTypeRequestSchema,
  updateServiceTypeRequestSchemaType,
} from "../../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../../database.js";
import throwDatabaseError from "../../../../utils/errorHandler.js";
import { createCheckedServices } from "../create.js";
import { deleteUncheckedServices } from "../delete.js";
import { getServiceByServiceTypeIdDB, getServiceTypeByIdDB } from "../read.js";
import { updateServiceTypeDB } from "../update.js";

async function putServiceTypeDBTransaction(
  body: updateServiceTypeRequestSchemaType,id:string
) {
  const transaction = await prisma.$transaction(
    async (prismaTransaction) => {
      try {
        const updateServiceTypeObject = createUpdateServiceTypeObject(
          prismaTransaction,
          body,id
        );

        const updatedServiceType: getServiceTypeWithServiceSchema | undefined =
          await updateServiceTypeDB(
            prismaTransaction,
            updateServiceTypeObject,
            id
          );

        const exisitingServices = await getServiceByServiceTypeIdDB(
          prismaTransaction,
          id
        );
        console.log("exisitingServices\n",exisitingServices)

        const exisitingServicesId: string[] | undefined =
          retrieveServicesId(exisitingServices);
          console.log("exisitingServicesId\n",exisitingServicesId)

        const services = body.serviceName;

        const checkedServicesId: string[] = await createCheckedServices(
          prismaTransaction,
          services,
          id
        );
        console.log("checkedServicesId\n",checkedServicesId)

        const deletedUncheckedServices = await deleteUncheckedServices(
          prismaTransaction,
          exisitingServicesId,
          checkedServicesId
        );
          console.log("deleted\n");
   
        return id;
      } catch (error) {
        if (error instanceof Error) throwDatabaseError(error);
      }
    },
    {
      isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
      maxWait: 50000,
      timeout: 50000,
    }
  );
  return transaction;
}

export { putServiceTypeDBTransaction };
