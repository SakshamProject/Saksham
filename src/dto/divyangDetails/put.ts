import { Prisma } from "@prisma/client";
import { updateDivyangDetailsRequest } from "../../types/divyangDetails/divyangDetailsSchema.js";
import { PersonalDetails } from "../../types/divyangDetails/personalDetailsSchema.js";
import { Address } from "../../types/divyangDetails/addressSchema.js";
import { EmploymentDetails } from "../../types/divyangDetails/employmentDetailsSchema.js";
import { IdProofUploads } from "../../types/divyangDetails/IdProofUploadsSchema.js";
import {
  DisabilityDetails,
  DisabilityOfDivyang,
  DisabilityOfDivyangList,
} from "../../types/divyangDetails/disabilityDetailsSchema.js";

const updatePersonalDetailsDBObject = (
  personalDetails: PersonalDetails,
  updatedBy: string
): Prisma.DivyangDetailsUpdateInput => {
  const updatePersonalDetails: Prisma.DivyangDetailsUpdateInput = {
    divyangId: personalDetails.divyangId,
    firstName: personalDetails.firstName,
    lastName: personalDetails.lastName,
    picture: personalDetails.picture,
    bloodGroup: personalDetails.bloodGroup,
    gender: personalDetails.gender,
    dateOfBirth: personalDetails.dateOfBirth,
    age: personalDetails.age,
    mailId: personalDetails.mailId,
    mobileNumber: personalDetails.mobileNumber,
    fatherName: personalDetails.fatherName,
    motherName: personalDetails.motherName,
    isMarried: personalDetails.isMarried,
    spouseName: personalDetails.spouseName,
    spouseNumber: personalDetails.spouseNumber,
    religion: personalDetails.religion,
    communityCategory: {
      connect: {
        id: personalDetails.communityCategoryId,
      },
    },
    community: personalDetails.community,
    extraCurricularActivity: personalDetails.extraCurricularActivity,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
  };
  return updatePersonalDetails;
};

const updateAddressDBObject = (
  addressRequest: Address,
  updatedBy: string
): Prisma.DivyangDetailsUpdateInput => {
  const updateAddress: Prisma.DivyangDetailsUpdateInput = {
    doorNumber: addressRequest.doorNumber,
    flatNumber: addressRequest.flatNumber,
    streetName: addressRequest.streetName,
    nagarName: addressRequest.nagarName,
    district: {
      connect: {
        id: addressRequest.districtId,
      },
    },
    isRural: addressRequest.isRural,
    villageName: addressRequest.villageName,
    panchayatUnion: {
      connect: {
        id: addressRequest.panchayatUnionId,
      },
    },
    taluk: {
      connect: {
        id: addressRequest.talukId,
      },
    },
    townPanchayat: {
      connect: {
        id: addressRequest.townPanchayatId,
      },
    },
    municipality: {
      connect: {
        id: addressRequest.municipalityId,
      },
    },
    corporation: {
      connect: {
        id: addressRequest.corporationId,
      },
    },
    mlaconstituency: {
      connect: {
        id: addressRequest.MLAConstituencyId,
      },
    },
    mpconstituency: {
      connect: {
        id: addressRequest.MPConstituencyId,
      },
    },
    pincode: addressRequest.pincode,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
  };
  return updateAddress;
};

const updateEmploymentDetailsDBObject = (
  employmentDetails: EmploymentDetails,
  updatedBy: string
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    isEmployed: employmentDetails.isEmployed,
    unemployedSince: employmentDetails.unemployedSince,
    occupation: employmentDetails.occupation,
    income: employmentDetails.income,
    fatherOccupation: employmentDetails.fatherOccupation,
    fatherIncome: employmentDetails.fatherIncome,
    motherOccupation: employmentDetails.motherOccupation,
    motherIncome: employmentDetails.motherIncome,
    spouseOccupation: employmentDetails.spouseOccupation,
    spouseIncome: employmentDetails.spouseIncome,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
  };
  return updateEmploymentDetails;
};

const updateIdProofUploadsDBObject = (
  IdProofUploads: IdProofUploads,
  updatedBy: string
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    voterId: IdProofUploads.voterId,
    panCardNumber: IdProofUploads.panCardNumber,
    drivingLicense: IdProofUploads.drivingLicense,
    rationCardNumber: IdProofUploads.rationCardNumber,
    aadharCardNumber: IdProofUploads.aadharCardNumber,
    pensionCardNumber: IdProofUploads.pensionCardNumber,
    medicalInsuranceNumber: IdProofUploads.medicalInsuranceNumber,
    disabilitySchemeNumber: IdProofUploads.disabilitySchemeNumber,
    BPL_OR_APL_Number: IdProofUploads.BPL_OR_APL_Number,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
  };
  return updateEmploymentDetails;
};

const updateDisabilityDetailsDBObject = (
  disabilityDetails: DisabilityDetails,
  updatedBy: string,
  disabilities: DisabilityOfDivyangList
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    districtCode: disabilityDetails.districtCode,
    stateCode: disabilityDetails.stateCode,
    identityCardNumber: disabilityDetails.identityCardNumber,
    udidCardNumber: disabilityDetails.UDIDCardNumber,
    udidEnrollmentNumber: disabilityDetails.UDIDEnrollmentNumber,
    udidCardUrl: disabilityDetails.UDIDCardUrl,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
    disabilities: {
      createMany: {
        data: disabilities.disabilitiesToCreate,
      },
      deleteMany: {
        id: {
          in: disabilities.disabilitiesToDelete,
        },
      },
    },
  };
  return updateEmploymentDetails;
};

function createUpdateDTOObject(
  pageNumber: number,
  updateDivyangDetailsRequest: updateDivyangDetailsRequest,
  disabilities: DisabilityOfDivyangList | null,
  updatedBy: string
) {
  if (pageNumber === 1 && updateDivyangDetailsRequest.personalDetails) {
    return updatePersonalDetailsDBObject(
      updateDivyangDetailsRequest.personalDetails,
      updatedBy
    );
  } else if (pageNumber === 3 && updateDivyangDetailsRequest.addressRequest) {
    return updateAddressDBObject(
      updateDivyangDetailsRequest.addressRequest,
      updatedBy
    );
  } else if (
    pageNumber === 5 &&
    updateDivyangDetailsRequest.employmentDetails
  ) {
    return updateEmploymentDetailsDBObject(
      updateDivyangDetailsRequest.employmentDetails,
      updatedBy
    );
  } else if (
    pageNumber === 4 &&
    updateDivyangDetailsRequest.disabiltyDetails &&
    disabilities
  ) {
    return updateDisabilityDetailsDBObject(
      updateDivyangDetailsRequest.disabiltyDetails,
      updatedBy,
      disabilities
    );
  } else if (pageNumber === 2 && updateDivyangDetailsRequest.IdProofUploads) {
    return updateIdProofUploadsDBObject(
      updateDivyangDetailsRequest.IdProofUploads,
      updatedBy
    );
  } else {
    console.log("Error - Enter a valid page number or object not present");
  }
}

export {
  updateAddressDBObject,
  updateDisabilityDetailsDBObject,
  updateEmploymentDetailsDBObject,
  updateIdProofUploadsDBObject,
  updatePersonalDetailsDBObject,
  createUpdateDTOObject,
};
