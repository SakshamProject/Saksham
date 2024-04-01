import { getEducationalQualificationSchema } from "../../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import prisma from "../../../database.js"
import throwDatabaseError from "../../../utils/errorHandler.js";

const getEducationalQualificationDB = async (): Promise<getEducationalQualificationSchema | undefined> => {
    try {
        const educationalQualifications = await prisma.educationQualification.findMany({});
        return educationalQualifications;
    }
    catch(error) {
        if(error instanceof Error) {
            throwDatabaseError(error);
        }
    }
}

export {getEducationalQualificationDB}