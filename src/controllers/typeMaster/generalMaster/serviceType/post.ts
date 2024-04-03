import { Request, Response, NextFunction } from "express";
import {
    serviceTypeRequestSchema,
  serviceTypeRequestSchemaType,
  postServiceType,
} from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { Prisma, Service, ServiceType } from "@prisma/client";
import {
  createPostServiceDBObject,
  createPostServiceTypeDBObject,
} from "../../../../dto/typeMaster/generalMaster/serviceType/post.js";
import {
  createServiceDB,
  createServiceTypeDB,
} from "../../../../services/database/typeMaster/generalMaster/serviceType/create.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";


async function postServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try{const body: serviceTypeRequestSchemaType= serviceTypeRequestSchema.parse(request.body);

  const postServiceTypeDBObject = createPostServiceTypeDBObject(body);

    const serviceType: ServiceType | undefined
     = await createServiceTypeDB(
        postServiceTypeDBObject
      );

      for(let serviceName of body.serviceName){

        const postServiceDBObject: postServiceType = createPostServiceDBObject(
          serviceName,
          serviceType?.id
        );
      
        const service: Service | undefined = await createServiceDB(
          postServiceDBObject
        );
      }

      const result= await getServiceTypeByIdDB(serviceType?.id);
   
    
   
  response.send(result);}catch(err){
    next(err)
  }
}



export { postServiceType };
