//import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { Designation, FeaturesOnDesignations } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { JsonObject, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { designationColumnNameMapper } from "../../utils/designation/designation.js";
import { DesignationResponse } from "../../../models/designation/designation.js";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});






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

async function getDesignationByNameDB(name: string) {
  try {
    
    const designation = await prisma.designation.findMany({
      where: {
        name: name,
      },
    });
    console.log(designation);
    return designation;
  } catch (err) {
    return err;
  }
}

async function createDesignationDB(
dataObject:Designation):Promise<Designation>{
  
    const newDesignation:Designation = await prisma.designation.create({
      data:dataObject

    });
    console.log(newDesignation.id);

    return newDesignation;
}

async function createFeaturesOnDesignationDB(FeaturesOnDesignationsDBObjects:FeaturesOnDesignations[]){
  for (let FeaturesOnDesignationsDBObject of FeaturesOnDesignationsDBObjects)
  await prisma.featuresOnDesignations.create({
    data:FeaturesOnDesignationsDBObject
  })
}

async function deleteDesignationDB(id:string){

  const deletedDesignation:Designation = await prisma.designation.delete({
    where: {
      id: id,
    },
  })
  return deletedDesignation;
}

export { getDesignationDB, createDesignationDB,getDesignationByID ,getDesignationByNameDB,createFeaturesOnDesignationDB,deleteDesignationDB};
