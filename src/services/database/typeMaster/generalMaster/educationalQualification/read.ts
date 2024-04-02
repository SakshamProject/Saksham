import { getEducationalQualificationWithTypeSchema } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js";
import throwDatabaseError from "../../../utils/errorHandler.js";

async function getEducationalQualificationByIdDB(id:string|undefined){
    try{  
        const educationalQualification:getEducationalQualificationWithTypeSchema|null = await prisma.educationQualification.findUnique({
        where: {
            id: id,
          },
          include: {
            y: {
              select: {
                name: true, 
              },
            },
          },

        });
        return educationalQualification;
    }catch(err){
        if (err instanceof Error) {
            throwDatabaseError(err);
          }
    }
}

export{getEducationalQualificationByIdDB}