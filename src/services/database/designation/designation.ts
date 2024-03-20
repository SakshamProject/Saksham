//import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { Designation } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { JsonObject, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { designationColumnNameMapper } from "../../utils/designation/designation.js";
import { DesignationResponse } from "../../../models/designation/designation.js";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});




async function getIdByNameDB(tableName: PrismaTable, name: string) {
  try {
    
    const feature_id = await prisma[tableName].findUnique({
      where: {
        name: name,
      },
      select: {
        id: true,
      },
    });

    return feature_id?.id;
  } catch (err) {
    return err;
  }
}

async function getDesignationDB(
  skip: number = defaults.skip,
  take: number = defaults.take,
  orderByColumn: string = "",
  orderByDirection: "asc" | "desc" = "asc"
): Promise<any> {
  const query = {
    skip: skip,
    take: take,
    include: {
      sevaKendra: {
        include: {
          district: {
            include: {
              state: true,
            },
          },
          contactPerson: true,
        },
      },
    },
    orderBy: designationColumnNameMapper(orderByColumn, orderByDirection),
  };



  try {
    const results = await prisma.designation.findMany(query);
    const count:number = await prisma.designation.count();

    const responseObject:DesignationResponse = {
      results: results,
      count: count,
      start: skip+1,
      rows: results.length,
      orderBy: orderByColumn,
      orderByDirection: orderByDirection

    };
    return responseObject;

  } catch (err) {
    return err;
  }
  
}

async function getDesignationByID(id:string){
 try{
  const designation = await prisma.designation.findUnique({
    where: {
      id: id,
    },
  })
  return designation;
 }catch(err){
  return err;
 }
}

async function createDesignationDB(
  sevaKendraId: string,
  designation: string,
) {
  try {
    const newDesignation:Designation = await prisma.designation.create({
      data:{
        name : designation,
        sevaKendraId : sevaKendraId
      }

    });
    console.log(newDesignation.id);

    return newDesignation;
  } catch (err) {
    return err;
  }
}

export { getDesignationDB, getIdByNameDB, createDesignationDB,getDesignationByID };
