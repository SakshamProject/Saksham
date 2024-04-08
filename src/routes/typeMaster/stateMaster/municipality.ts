import express from "express";
import { postMunicipality } from "../../../controllers/typeMaster/stateMaster/municipality/post.js";
import {
  getMunicipality,
  getMunicipalityByDistrictId,
  getMunicipalityById,
} from "../../../controllers/typeMaster/stateMaster/municipality/get.js";
import { putMunicipality } from "../../../controllers/typeMaster/stateMaster/municipality/put.js";
import { deleteMunicipality } from "../../../controllers/typeMaster/stateMaster/municipality/delete.js";

const MunicipalityRouter = express.Router();
MunicipalityRouter.post("/", postMunicipality);
MunicipalityRouter.get("/", getMunicipality);
MunicipalityRouter.get("/:id", getMunicipalityById);
MunicipalityRouter.put("/:id", putMunicipality);
MunicipalityRouter.delete("/:id", deleteMunicipality);
MunicipalityRouter.get("/districts/:id", getMunicipalityByDistrictId);

export default MunicipalityRouter;
