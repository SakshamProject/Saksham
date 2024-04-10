import { Prisma } from "@prisma/client";
import { DivyangDetailsRequest, postDivyangDetailsRequest } from "../../types/divyangDetails/divyangDetailsSchema.js";

const createDivyangDetailsDBObject = (divyangDetails: postDivyangDetailsRequest): Prisma.DivyangDetailsUncheckedCreateInput => {
    const newDivyangDetails: Prisma.DivyangDetailsUncheckedCreateInput = {
        divyangId: divyangDetails.personalDetails.divyangId,
        firstName: divyangDetails.personalDetails.firstName,
        lastName: divyangDetails.personalDetails.lastName,
        picture: divyangDetails.personalDetails.picture,
        bloodGroup: divyangDetails.personalDetails.bloodGroup,
        gender: divyangDetails.personalDetails.gender,
        dateOfBirth: divyangDetails.personalDetails.dateOfBirth,
        age: divyangDetails.personalDetails.age,
        mailId: divyangDetails.personalDetails.mailId,
        mobileNumber: divyangDetails.personalDetails.mobileNumber,
        fatherName: divyangDetails.personalDetails.fatherName,
        motherName: divyangDetails.personalDetails.motherName,
        isMarried: divyangDetails.personalDetails.isMarried,
        spouseName: divyangDetails.personalDetails.spouseName,
        spouseNumber: divyangDetails.personalDetails.spouseNumber,
        religion: divyangDetails.personalDetails.religion,
        communityCategoryId: divyangDetails.personalDetails.communityCategoryId,
        community: divyangDetails.personalDetails.community,
        extraCurricularActivity: divyangDetails.personalDetails.extraCurricularActivity
    }
    return newDivyangDetails
}

export { createDivyangDetailsDBObject }