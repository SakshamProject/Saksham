import { Prisma } from '@prisma/client';
import { updateDivyangDetailsRequest } from '../../types/divyangDetails/divyangDetailsSchema.js';
import {
  PersonalDetails,
  UpdatePersonalDetails,
} from '../../types/divyangDetails/personalDetailsSchema.js';
import { Address } from '../../types/divyangDetails/addressSchema.js';
import { EmploymentDetails } from '../../types/divyangDetails/employmentDetailsSchema.js';
import { IdProofUploads } from '../../types/divyangDetails/IdProofUploadsSchema.js';
import {
  DisabilityDetails,
  DisabilityOfDivyangList,
  EducationQualificationOfDivyangList,
} from '../../types/divyangDetails/disabilityDetailsSchema.js';

const updatePersonalDetailsDBObject = (
  personalDetails: UpdatePersonalDetails,
  educationQualification: EducationQualificationOfDivyangList,
  updatedBy: string
): Prisma.DivyangDetailsUpdateInput => {
  const updatePersonalDetails: Prisma.DivyangDetailsUpdateInput = {
    divyangId: personalDetails.divyangId,
    firstName: personalDetails.firstName,
    lastName: personalDetails.lastName,
    bloodGroup: personalDetails.bloodGroup,
    gender: personalDetails.gender,
    dateOfBirth: personalDetails.dateOfBirth,
    age: personalDetails.age,
    mailId: personalDetails.mailId,
    mobileNumber: personalDetails.mobileNumber,
    fatherName: personalDetails.fatherName,
    motherName: personalDetails.motherName,
    udidCardNumber: personalDetails.UDIDCardNumber,
    isMarried: personalDetails.isMarried,
    spouseName: personalDetails.spouseName,
    spouseNumber: personalDetails.spouseNumber,
    religion: personalDetails.religion,
    communityCategory: {
      connect: {
        id: personalDetails.communityCategoryId,
      },
    },
    person: {
      update: {
        userName: personalDetails.userName
      }
    },
    community: personalDetails.community,
    extraCurricularActivity: personalDetails.extraCurricularActivity,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
    educationQualifications: {
      createMany: {
        data: educationQualification.educationQualificationsToCreate,
      },
      deleteMany: {
        id: {
          in: educationQualification.educationQualificationsToDelete,
        },
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
    taluk: {
      connect: {
        id: addressRequest.talukId,
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

    isSameAddress: addressRequest.isSameAddress,

    doorNumberCommunication: addressRequest.doorNumberCommunication,
    flatNumberCommunication: addressRequest.flatNumberCommunication,
    streetNameCommunication: addressRequest.streetNameCommunication,
    nagarNameCommunication: addressRequest.nagarNameCommunication,
    districtCommunication: {
      connect: {
        id: addressRequest.districtIdCommunication,
      },
    },
    isRuralCommunication: addressRequest.isRuralCommunication,
    talukCommunication: {
      connect: {
        id: addressRequest.talukIdCommunication,
      },
    },
    mlaconstituencyCommunication: {
      connect: {
        id: addressRequest.MLAConstituencyIdCommunication,
      },
    },
    mpconstituencyCommunication: {
      connect: {
        id: addressRequest.MPConstituencyIdCommunication,
      },
    },
    pincodeCommunication: addressRequest.pincodeCommunication,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
  };

  if (addressRequest.isRural) {
    (updateAddress.villageName = addressRequest.villageName),
      (updateAddress.panchayatUnion = {
        connect: {
          id: addressRequest.panchayatUnionId,
        },
      });
  } else {
    (updateAddress.townPanchayat = {
      connect: {
        id: addressRequest.townPanchayatId,
      },
    }),
      (updateAddress.municipality = {
        connect: {
          id: addressRequest.municipalityId,
        },
      }),
      (updateAddress.corporation = {
        connect: {
          id: addressRequest.corporationId,
        },
      });
  }
  if (addressRequest.isRuralCommunication) {
    (updateAddress.villageNameCommunication =
      addressRequest.villageNameCommunication),
      (updateAddress.panchayatUnionCommunication = {
        connect: {
          id: addressRequest.panchayatUnionIdCommunication,
        },
      });
  } else {
    (updateAddress.townPanchayatCommunication = {
      connect: {
        id: addressRequest.townPanchayatIdCommunication,
      },
    }),
      (updateAddress.municipalityCommunication = {
        connect: {
          id: addressRequest.municipalityIdCommunication,
        },
      }),
      (updateAddress.corporationCommunication = {
        connect: {
          id: addressRequest.corporationIdCommunication,
        },
      });
  }
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
    voterId: IdProofUploads.voterIdNumber,
    panCardNumber: IdProofUploads.panCardNumber,
    drivingLicense: IdProofUploads.drivingLicenseNumber,
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
  updatedBy: string
): Prisma.DivyangDetailsUpdateInput => {
  const updateEmploymentDetails: Prisma.DivyangDetailsUpdateInput = {
    districtCode: disabilityDetails.districtCode,
    stateCode: disabilityDetails.stateCode,
    identityCardNumber: disabilityDetails.identityCardNumber,
    udidEnrollmentNumber: disabilityDetails.UDIDEnrollmentNumber,
    udidCardNumber: disabilityDetails.UDIDCardNumber,
    // udidCardUrl: disabilityDetails.UDIDCardUrl,
    updatedBy: {
      connect: {
        id: updatedBy,
      },
    },
  };
  return updateEmploymentDetails;
};

function createUpdateDTOObject(
  pageNumber: number,
  updateDivyangDetailsRequest: updateDivyangDetailsRequest,
  educationQualification:
    | EducationQualificationOfDivyangList
    | null
    | undefined,
  updatedBy: string
) {
  console.log(`[+]enters dto`);
  if (
    pageNumber === 1 &&
    updateDivyangDetailsRequest.personalDetails &&
    educationQualification
  ) {
    return updatePersonalDetailsDBObject(
      updateDivyangDetailsRequest.personalDetails,
      educationQualification,
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
    updateDivyangDetailsRequest.disabilityDetails
  ) {
    return updateDisabilityDetailsDBObject(
      updateDivyangDetailsRequest.disabilityDetails,
      updatedBy
    );
  } else if (pageNumber === 2 && updateDivyangDetailsRequest.IdProofUploads) {
    return updateIdProofUploadsDBObject(
      updateDivyangDetailsRequest.IdProofUploads,
      updatedBy
    );
  } else {
    console.log('Error - Enter a valid page number or object not present');
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
