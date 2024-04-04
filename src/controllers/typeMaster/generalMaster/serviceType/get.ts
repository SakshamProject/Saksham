import { Request, Response, NextFunction } from "express";
import { getServiceTypeWithServiceSchema } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { getServiceByServiceTypeIdDB, getServiceTypeByIdDB, getServiceTypeCount, getServiceTypeDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import { Service, ServiceType } from "@prisma/client";
import getRequestSchema from "../../../../types/getRequestSchema.js";

async function getServiceTypeById(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const id = request.params.id;
    const result: getServiceTypeWithServiceSchema | undefined | null =
      await getServiceTypeByIdDB(id);
    response.send(result);
  } catch (err) {
    next(err);
  }
}

async function getServiceType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const query = getRequestSchema.parse(request.query);

    const results = await getServiceTypeDB(
      query.start,
      query.rows,
      query.orderByColumn,
      query.sortOrder,
      query.searchText,
    );

    const count:number  = await getServiceTypeCount();

    response.send({
        result:results,
        count:count,
        start:query.start,
        rows:query.rows,
        orderByColumn:query.orderByColumn,
        orderByDirection:query.sortOrder
    });
}

 async function getServiceByServiceTypeId(request:Request,response:Response,next:NextFunction){
  const id :string = request.params.serviceTypeId;
  const result :ServiceType[]|undefined = await getServiceByServiceTypeIdDB(id);
  
  response.send({
    result:result
  });

 }

export { getServiceTypeById, getServiceType, getServiceByServiceTypeId };
