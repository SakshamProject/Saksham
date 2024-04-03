import { NextFunction, Request, Response } from "express";
import { postEducationalQualificationBodyType, postEducationQualification, postRequestEducationQualification } from "../../../../types/typeMaster/generalMaster/educationalQualificationSchema.js";
import { EducationQualification, EducationQualificationType } from "@prisma/client";
import { getEducationalQualificationByIdDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/read.js";
import { createPostEducationQualificationDBObject, createPostEducationQualificationTypeDBObject } from "../../../../dto/typeMaster/generalMaster/educationalQualification/post.js";
import { createEducationQualificationDB, createEducationQualificationTypeDB } from "../../../../services/database/typeMaster/generalMaster/educationalQualification/create.js";

async function postEducationQualificationType(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try{const body: postEducationalQualificationBodyType = postRequestEducationQualification.parse(request.body);

    const postEducationalQualificationDBObject = createPostEducationQualificationTypeDBObject(body);

    const educationQualificationType: EducationQualificationType | undefined
     = await createEducationQualificationTypeDB(
        postEducationalQualificationDBObject
      );

      for(let educationQualificationName of body.educationQualificationName){

        const postEducationQualificationDBObject: postEducationQualification = createPostEducationQualificationDBObject(
            educationQualificationName,
            educationQualificationType?.id
        );
      
        const educationQualification: EducationQualification | undefined = await createEducationQualificationDB(
          postEducationQualificationDBObject
        );
      }

      const result= await getEducationalQualificationByIdDB(educationQualificationType?.id);
   
    
   
  response.send(result);}catch(err){
    next(err)
  }
}



export { postEducationQualificationType };
