import { NextFunction, Request, Response } from "express";
import { getDesignationByIDDB, getDesignationDB } from "../../services/database/designation/read.js";
import { createResponseOnlyData, createResponseWithQuery } from "../../types/createResponseSchema.js";
import getRequestSchema from "../../types/getRequestSchema.js";
import { getDesignationDBTransaction } from "../../services/database/designation/transaction/read.js";

async function getDesignation(request: Request, response: Response) {
    const query = getRequestSchema.parse(
      request.query
    );
    const result = await getDesignationDBTransaction(
      query.start,
      query.rows,
      query.orderByColumn,
      query.sortOrder,
      query.searchText
    );
    const count: number = result?.designations?.length || 0;
    const total: number = result?.total || 0;
    const responseData = createResponseWithQuery(
      result?.designations ||{},
      query,
      total,
      count
    );

    response.send(responseData);
  
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

  export {getDesignationById,getDesignation}