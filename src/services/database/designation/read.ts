import defaults from "../../../defaults.js";
import { DesignationResponse } from "../../../models/designation/designation.js";
import { designationColumnNameMapper } from "../../utils/designation/designation.js";
import prisma from "../database.js";

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
    const count: number = await prisma.designation.count();

    const responseObject: DesignationResponse = {
      results: results,
      count: count,
      start: skip + 1,
      rows: results.length,
      orderBy: orderByColumn,
      orderByDirection: orderByDirection,
    };
    return responseObject;
  } catch (err) {
    return err;
  }
}

async function getDesignationByIDDB(id: string | undefined) {
  try {
    const designation = await prisma.designation.findUnique({
      where: {
        id: id,
      },
      select: {
        id:true,
        name:true,
        sevaKendra: {
          select: {
            id: true,
            name: true,
            district: {
              select: {
                id: true,
                name: true,
                state: {
                  select:{
                    id:true,
                    name:true
                  }
                 
                
                },
              },
            },
          },
        },
        features: {
          select: {
            feature:{
              select:{
                id:true,
                name:true
              }
            }
          },
        },
      },
    });

    return designation;
  } catch (err) {
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

export { getDesignationDB, getDesignationByIDDB, getDesignationByNameDB };
