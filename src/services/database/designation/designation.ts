//import prisma from "../database.js";
import defaults from "../../../defaults.js";
import { Designation, FeaturesOnDesignations } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { JsonObject, PrismaClientValidationError } from "@prisma/client/runtime/library";
import { designationColumnNameMapper } from "../../utils/designation/designation.js";
import { DesignationResponse } from "../../../models/designation/designation.js";
import throwDatabaseError from "../utils/errorHandler.js";
import { postDesignationType } from "../../../types/designation/designationSchema.js";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});










async function deleteDesignationDB(id:string){

  const deletedDesignation:Designation = await prisma.designation.delete({
    where: {
      id: id,
    },
  })
  return deletedDesignation;
}

