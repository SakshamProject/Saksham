//import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { Designation } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { JsonObject, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { designationColumnNameMapper } from "../utils/designation.js";
import { DesignationResponse, PrismaTable } from "../../../models/designation/designation.js";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

async function getCount(tableName: PrismaTable): Promise<any> {
  try {
    const count: number = await prisma[tableName].count();
    return count;
  } catch (err) {
    return err;
  }
}


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
): Promise<Designation[]> {
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

    const response:DesignationResponse = {
      results: results,
      count: count,
    };



    return jsonObject;
  } catch (err) {
    return err;
  }
}

async function upsertDesignationDB(reqBody) {
  try {
    // const result = await prisma.designation.upsert({
    //   where: { id: reqBody.id },
    //   update: reqBody,
    //   create: reqBody,
    // });

    return result;
  } catch (err) {
    return err;
  }
}

async function createDesignationDB(
  sevaKendraId: string,
  designation: string,
  features_id: string[]
) {
  try {
    const newDesignation:Designation = await prisma.designation.create({
        data: {
          name: designation,
          sevaKendraId: sevaKendraId,
          features: {
            connectOrCreate: [
              { 
                where: { 
                  feature: { name: 'divyang-details' }, // Accessing name property from Feature model
                  designationId: newDesignation.id // Assuming newDesignation has been created earlier in the code
                },
                create: { 
                  feature: { 
                    create: { name: 'divyang-details' } // Create the Feature if it doesn't exist
                  },
                  designationId: newDesignation.id
                }
              },
              { 
                where: { 
                  feature: { name: 'users' }, // Accessing name property from Feature model
                  designationId: newDesignation.id // Assuming newDesignation has been created earlier in the code
                },
                create: { 
                  feature: { 
                    create: { name: 'users' } // Create the Feature if it doesn't exist
                  },
                  designationId: newDesignation.id
                }
              }
            ]
          }
        },
        include: {
          features: true
        }
      });

    console.log("New Designation:", newDesignation);

    return newDesignation;
  } catch (err) {
    return err;
  }
}

export { getDesignationDB, getIdByNameDB, createDesignationDB };
