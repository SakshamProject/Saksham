import { Request, Response,NextFunction } from "express";
import { getServiceTypeWithServiceSchema } from "../../../../types/typeMaster/generalMaster/serviceTypeSchema.js";
import { getServiceTypeByIdDB } from "../../../../services/database/typeMaster/generalMaster/serviceType/read.js";
import getRequestSchema from "../../../getRequest.schema.js";


async function getServiceTypeById(request:Request, response:Response, next:NextFunction){
    try{
        const id = request.params.id;
        console.log(id)
        const result:getServiceTypeWithServiceSchema|undefined|null = await getServiceTypeByIdDB(id);
        response.send(result);
    }catch(err){
        
        next(err);
    }
}

async function getServiceType(request:Request, response:Response, next:NextFunction){
    const query = getRequestSchema.parse(
        request.query
      );

      //const orderByColumn: string | undefined = orderBy;

      console.log(query);
    
    //   const results = await getDesignationDB(
    //     start,
    //     rows,
    //     orderByColumn,
    //     orderByDirection
    //   );
    
    //   response.send(results);

}

export {getServiceTypeById,getServiceType};