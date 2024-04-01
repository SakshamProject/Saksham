import { NextFunction, Request, Response } from "express";
import { getEducationalQualificationSchema } from "../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { getEducationalQualificationDB } from "../../../services/database/typeMaster/generalMaster/educationalQualification/get.js";

const getEducationalQualification = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const result: getEducationalQualificationSchema[] | undefined = await getEducationalQualificationDB();
        response.send(result)
    }
    catch(error) {
        next(error)
    }
}

export {getEducationalQualification}