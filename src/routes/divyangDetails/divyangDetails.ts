import express from "express";
import {
    getDivyangDetails,
    getDivyangDetailsbyId,
    getDivyangDetailsSearchByColumn,
} from "../../controllers/divyangDetails/get.js";
import {postDivyangDetails} from "../../controllers/divyangDetails/post.js";
import {putDivyangDetails} from "../../controllers/divyangDetails/put.js";
import fileHandler from "../../middlewares/fileHandler/fileHandler.js";
import authorization from "../../middlewares/authentication/authorization.js";
import {AuthorizationEnum, MethodsEnum,} from "../../types/authentication/authorizationEnum.js";
import {getServiceMappingByDivyangId} from "../../controllers/serviceMapping/get.js";
import resetPassword from "../../controllers/authentication/resetPasssword.js";

const divyangDetailsRouter = express.Router();

divyangDetailsRouter.post(
    "/resetpassword",
    authorization(
        AuthorizationEnum.DIVYANG_DETAILS,
        MethodsEnum.DIVYANG_DROPDOWN
    ),
    resetPassword
);
divyangDetailsRouter.post(
    "/list/",
    authorization(AuthorizationEnum.DIVYANG_DETAILS),
    getDivyangDetails
);
divyangDetailsRouter.get(
    "/:id",
    authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.GET_BY_ID),
    getDivyangDetailsbyId
);
divyangDetailsRouter.get(
    "/",
    authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.USER_DROPDOWN),
    getDivyangDetailsSearchByColumn
);
divyangDetailsRouter.post(
    "/",
    authorization(AuthorizationEnum.DIVYANG_DETAILS),
    fileHandler.single("picture"),
    postDivyangDetails
);
divyangDetailsRouter.put(
    "/:id",
    authorization(AuthorizationEnum.DIVYANG_DETAILS, MethodsEnum.PUT),
    fileHandler.fields([
        {name: "profilePhoto", maxCount: 1},
        {name: "voterId", maxCount: 1},
        {name: "panCard", maxCount: 1},
        {name: "drivingLicense", maxCount: 1},
        {name: "rationCard", maxCount: 1},
        {name: "aadharCard", maxCount: 1},
        {name: "pensionCard", maxCount: 1},
        {name: "medicalInsuranceCard", maxCount: 1},
        {name: "disabilitySchemeCard", maxCount: 1},
        {name: "BPL_OR_APL_Card", maxCount: 1},
        {name: "disabilityCard", maxCount: 10},
        {name: "UDIDCard", maxCount: 1},
    ]),
    putDivyangDetails
);
divyangDetailsRouter.post(
    "/:divyangId/services",
    authorization(AuthorizationEnum.SERVICE_MAPPING, MethodsEnum.GET_BY_ID),
    getServiceMappingByDivyangId
);
// divyangDetailsRouter.delete('/:id', deleteDivyangDetails)

export {divyangDetailsRouter};
