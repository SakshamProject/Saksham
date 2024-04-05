import { Prisma } from "@prisma/client";
import { disabilityTypeRequestSchemaType } from "../../../../types/typeMaster/generalMaster/disabilityType.js";

function createPostDisabilityTypeDBObject(
  prismaTransaction: any,
  body: disabilityTypeRequestSchemaType
) {
  const postDisabilityTypeDBObject: Prisma.DisabilityTypeCreateInput = {
    name: body.disabilityType,
  };

  return postDisabilityTypeDBObject;
}

function createPostDisabilitySubTypeDBObject(
  
  
  disabilitySubTypeName: string,
  disabilityTypeId: string | undefined
) {
  const postDisabilitySubTypeDBObject: Prisma.DisabilitySubTypeCreateInput = {
    name: disabilitySubTypeName,
    disability: {
      connect: { id: disabilityTypeId },
    },
  };
  return postDisabilitySubTypeDBObject;
}

export {
  createPostDisabilityTypeDBObject,
  createPostDisabilitySubTypeDBObject,
};
