import { NextFunction, Request, Response } from "express";
import { postDesignationRequestSchema } from "../../types/designation/designationSchema.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";
import { postDesignationDBTransaction } from "../../services/database/designation/transaction/create.js";
import { getDesignationByIDDB } from "../../services/database/designation/read.js";

async function postDesignation(request: Request, response: Response,next:NextFunction) {

    try{
      const body = postDesignationRequestSchema.parse(request.body);

    if(request.user){
      const assignedById:string = request.user.id;
      const result = await postDesignationDBTransaction(body,assignedById);

      const responseResult = await getDesignationByIDDB(result?.id);
      const responseData = createResponseOnlyData(responseResult ||{});
      response.send(responseData);}
      
    }catch(err){
      next(err);
    }    

  }
  
  export {postDesignation};