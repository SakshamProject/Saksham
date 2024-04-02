import { Prisma, Service, ServiceType } from "@prisma/client";
import {
  getServiceTypeWithServiceSchema,
  postRequestSchemaType,
  postServiceType,
} from "../../../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import prisma from "../../../../database.js";
import {
  createPostServiceDBObject,
  createPostServiceTypeDBObject,
} from "../../../../../../dto/typeMaster/generalMaster/serviceType/post.js";
import { createServiceDB, createServiceTypeDB } from "../create.js";
import { getServiceTypeByIdDB } from "../read.js";
 

async function postTransaction(body: postRequestSchemaType) {

   
  return prisma.$transaction(async (tx) => {


    const postServiceTypeDBObject = createPostServiceTypeDBObject(body);

    const serviceType: ServiceType | undefined = await createServiceTypeDB(
      postServiceTypeDBObject
    );

    for (let serviceName of body.serviceName) {
      const postServiceDBObject: postServiceType = createPostServiceDBObject(
        serviceName,
        serviceType?.id
      );
      console.log(`serviceObject: `, postServiceDBObject);

      const service: Service | undefined = await createServiceDB(
        postServiceDBObject
      );

      console.log(`service: `, service);
    }

    const result: getServiceTypeWithServiceSchema | undefined | null =
      await getServiceTypeByIdDB(serviceType?.id);

    return result;
  });
}

export { postTransaction };
