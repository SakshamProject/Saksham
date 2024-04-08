import { NextFunction, Request, Response } from "express";
import { getDesignationByIDDB, getDesignationDB } from "../../services/database/designation/read.js";
import { createResponseOnlyData } from "../../types/createResponseSchema.js";

async function getDesignation(request: Request, response: Response) {
    const { start, rows, orderBy, orderByDirection } = getRequestSchema.parse(
      request.query
    );
    const orderByColumn: string | undefined = orderBy;
  
    const results = await getDesignationDB(
      start,
      rows,
      orderByColumn,
      orderByDirection
    );
  
    response.send(results);
  }
  
  async function getDesignationById(request: Request, response: Response,next:NextFunction) {
    try{
      const id: string = request.params.id;
    const result = await getDesignationByIDDB(id);

    const responseData = createResponseOnlyData(result ||{});
    response.send(responseData);
  }catch(err){
    next(err)
  }
  }

  // async function getDesignationByName(request: Request, response: Response) {
  //   const name: string = request.params.name;
  //   const designation = await getDesignationByNameDB(name);
   
  //   response.send({
  //     "data":designation
  //   })
  // }
  export {getDesignationById,getDesignation}