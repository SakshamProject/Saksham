import { Request, Response, NextFunction } from "express";
import {
    getServiceTypeWithServiceSchema,
  postRequestSchema,
  postRequestSchemaType,
  postServiceType,
  postServiceTypeType,
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
import { postTransaction } from "../../../../services/database/typeMaster/generalMaster/serviceType/transactions/post.js";

// async function postServiceType(
//   request: Request,
//   response: Response,
//   next: NextFunction
// ) {
//   try{const body: postRequestSchemaType = postRequestSchema.parse(request.body);

//   const postServiceTypeDBObject = createPostServiceTypeDBObject(body);

//     const serviceType: ServiceType | undefined
//      = await createServiceTypeDB(
//         postServiceTypeDBObject
//       );
   
//     const postServiceDBObject: postServiceType = createPostServiceDBObject(
//     body,
//     serviceType?.id
//   );

//     const service: Service | undefined = await createServiceDB(
//     postServiceDBObject
//   );
//   response.send(serviceType);}catch(err){
    
//   }
// }

async function postServiceType(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try{const body: postRequestSchemaType = postRequestSchema.parse(request.body);

      const serviceType  = postTransaction(body);
  
  
      

    response.send(serviceType);}catch(err){
      
  next(err);
  }
}

export { postServiceType };
