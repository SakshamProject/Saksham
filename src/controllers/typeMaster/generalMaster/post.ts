import { EducationQualification, Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

const postEducationalQualification = async (request: Request, response: Response, next: NewableFunction) => {
    try {
        const educationalQualification: EducationQualification = educationalQualificationSchema.parse(request.body)
        const educationalQualificationDBObject: Prisma.EducationalQualificationUncheckedCreateInput = createEducationalQualificationDBObject(educationalQualification);
        const result: EducationQualification | undefined = await createEducationalQualificationDB(educationalQualificationDBObject)
        response.send(result)
    }
    catch(error) {
        next(error)
    }
};

export {postEducationalQualification}