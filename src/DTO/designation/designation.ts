import { Designation, FeaturesOnDesignations } from "@prisma/client";
import { postRequestType } from "../../controllers/designation/designation.schema.js";
import { randomUUID } from "crypto";

const createDesignationDBObject = async (request:postRequestType):Promise<Designation>=>{
    const createDesignationDBObject = {
        id: randomUUID(),
        name: request.designation,
        sevaKendraId: request.sevaKendraId
    }
    return createDesignationDBObject;
}

const createFeaturesOnDesignationDBObject = (
    designationId: string,
    request: postRequestType
  ): FeaturesOnDesignations[] => {
    let FeaturesOnDesignations: FeaturesOnDesignations[] = [];
    console.log("*************");
    console.log(request.featuresId);
  
    for (let featureId of request.featuresId) {
        console.log(featureId);
      const FeaturesOnDesignationsDBObject: FeaturesOnDesignations= {
        id: randomUUID(),
        designationId: designationId,
        featureId: featureId,
        assignedById:request.assignedById,
        assignedOn:new Date()
      };
      FeaturesOnDesignations.push(FeaturesOnDesignationsDBObject);
    }
    return FeaturesOnDesignations;
  };

export {createDesignationDBObject, createFeaturesOnDesignationDBObject};
