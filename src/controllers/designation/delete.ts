import { Designation } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { deleteDesignationDB } from "../../services/database/designation/delete.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

async function deleteDesignation(request:Request, response:Response,next:NextFunction){

    try{
      const id: string = request.params.id;
    const deletedDesignation:Designation |undefined= await deleteDesignationDB(id);
    const responseData = createResponseOnlyData(deletedDesignation ||{});
    response.send(responseData);}
    catch(err){
      next(err)
    }}
    
  
 
  export {deleteDesignation}