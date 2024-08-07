import { featuresSchemaType } from "../../../types/designation/designationSchema.js";
import { createPostFeaturesOnDesignationsDBObject } from "../../../dto/designation/designation.js";
import { createFeaturesOnDesignationDB } from "../../database/designation/create.js";
import { FeaturesOnDesignations, Prisma } from "@prisma/client";
import { deleteFeaturesOndesignationsDB } from "../../database/designation/delete.js";

async function createCheckedFeaturesOnDesignations(
  prismaTransaction: Prisma.TransactionClient,
  checkedFeaturesId: string[] = [],
  exisitingfeaturesId: string[] = [],
  designationId: string,
  assignedById: string = ""
) {
  const createFeaturesOnDesignations = await Promise.all(
    checkedFeaturesId
      .filter((featureId) => !exisitingfeaturesId.includes(featureId))
      .map(async (featureId) => {
        const postFeaturesOnDesignationsDBObject =
          createPostFeaturesOnDesignationsDBObject(
            designationId,
            featureId,
          );
        const FeaturesOnDesignations = await createFeaturesOnDesignationDB(
          prismaTransaction,
          postFeaturesOnDesignationsDBObject
        );
        return FeaturesOnDesignations;
      })
  );

}

async function deleteUncheckedDesignations(
  prismaTransaction: Prisma.TransactionClient,
  exisitingFeaturesId: string[] = [],
  checkedFeaturesId: string[] = [],
  designationId: string
) {




  const deleteFeaturesOnDesignations = await Promise.all(
    exisitingFeaturesId
      .filter( (featureId) => !checkedFeaturesId.includes(featureId))
      .map(async (featureId) => {
        const deletedFeaturesOnDesignation =
          await deleteFeaturesOndesignationsDB(
            prismaTransaction,
            designationId,
            featureId
          );

        console.log(
          "[+]deletedFeaturesOnDesignation",
          deletedFeaturesOnDesignation
        );
        return deletedFeaturesOnDesignation;
      })
  );
 
}

function retrieveFeatureIds(
  existingFeatures: FeaturesOnDesignations[] | undefined,
  checkedFeatures: featuresSchemaType[] | undefined
) {
  const existingFeaturesId =
    existingFeatures?.map((feature) => feature.featureId) || [];

  const checkedFeaturesId = checkedFeatures?.map((feature) => feature.id) || [];

  return { existingFeaturesId, checkedFeaturesId };
}

export {
  createCheckedFeaturesOnDesignations,
  deleteUncheckedDesignations,
  retrieveFeatureIds,
};
