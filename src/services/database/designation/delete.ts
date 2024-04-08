import { Designation } from "@prisma/client";
import prisma from "../database.js";
import throwDatabaseError from "../utils/errorHandler.js";

async function deleteDesignationDB(id:string){

try{
  const deletedDesignation:Designation = await prisma.designation.delete({
    where: {
      id: id,
    },
    include:{
      sevaKendra:true
    }
  })
  return deletedDesignation;
}catch(err){
if (err instanceof Error) {
  throwDatabaseError(err);
}
  }
}

  export {deleteDesignationDB}