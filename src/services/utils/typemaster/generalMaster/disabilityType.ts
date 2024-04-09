import { DisabilitySubType } from "@prisma/client";
import { createPostDisabilitySubTypeDBObject } from "../../../../dto/typeMaster/generalMaster/disabilityType/post.js";
import {
  disabilitySchemaType,
  getSelectedDisabilitySubTypeSchema,
  postDisabilitySubTypeType,
} from "../../../../types/typeMaster/generalMaster/disabilityType.js";
import { createDisabilitySubTypeDB } from "../../../database/typeMaster/generalMaster/disabilityType/create.js";
import { deleteDisabilitySubTypeDB } from "../../../database/typeMaster/generalMaster/disabilityType/delete.js";

function retrieveDisabilitySubTypesId(
  services: getSelectedDisabilitySubTypeSchema[] | undefined
) {
  try {
    const servicesId: string[] = [];
    if (services) {
      for (let service of services) {
        servicesId.push(service.id);
      }
    }
    return servicesId;
  } catch (err) {
    throw err;
  }
}

async function createCheckedDisabilitySubTypes(
  prismaTransaction: any,
  disabilities: disabilitySchemaType[],
  updatedDisabilitySubTypeId: string | undefined
) {
  try {
    const checkedServicesId: string[] | undefined = [];

    for (let disability of disabilities) {
      if (!disability.id) {
        const postServiceDBObject: postDisabilitySubTypeType =
          createPostDisabilitySubTypeDBObject(
           
            disability.name,
            updatedDisabilitySubTypeId
          );

        const createdDisabilitySubType: DisabilitySubType | undefined =
          await createDisabilitySubTypeDB(prismaTransaction, postServiceDBObject);

        if (createdDisabilitySubType) {
          checkedServicesId.push(createdDisabilitySubType.id);
        }
      } else {
        if (disability) {
          checkedServicesId.push(disability.id);
        }
      }
    }
    return checkedServicesId;
  } catch (err) {
    throw err;
  }
}

async function deleteUncheckedDisabilitySubTypes(
  prismaTransaction: any,
  exisitingDisabilitySubTypesId: string[],
  updatedDisabilitySubTypesIdId: string[]
) {
  try {
    for (let exisitingId of exisitingDisabilitySubTypesId) {
      if (!updatedDisabilitySubTypesIdId.includes(exisitingId)) {
        const deletedDisabilitySubTypesIdId = await deleteDisabilitySubTypeDB(
          prismaTransaction,
          exisitingId
        );
      }
    }
  } catch (err) {
    throw err;
  }
}

export {
  retrieveDisabilitySubTypesId,
  createCheckedDisabilitySubTypes,
  deleteUncheckedDisabilitySubTypes,
};
