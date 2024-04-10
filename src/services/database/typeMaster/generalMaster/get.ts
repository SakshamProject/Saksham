import prisma from "../../database.js";
import throwDatabaseError from "../../utils/errorHandler.js";

async function getGeneralMasterDB(){
    try{
        const generalMasterSeed = await prisma.generalMasters.findMany();
    return generalMasterSeed;
    }catch(err)
    {
        if(err instanceof Error){
            throwDatabaseError(err);
        }
    }
}

export {getGeneralMasterDB}