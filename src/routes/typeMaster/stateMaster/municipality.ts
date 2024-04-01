import express from "express";
import { postMunicipality } from "../../../controllers/typeMaster/stateMaster/municipality/post.js";
import {
  getByIdMunicipality,
  getMunicipality,
} from "../../../controllers/typeMaster/stateMaster/municipality/get.js";
import { putMunicipality } from "../../../controllers/typeMaster/stateMaster/municipality/put.js";
import { deleteMunicipality } from "../../../controllers/typeMaster/stateMaster/municipality/delete.js";

const MunicipalityRouter = express.Router();
MunicipalityRouter.post("/", postMunicipality);
MunicipalityRouter.get("/", getMunicipality);
MunicipalityRouter.get("/:id", getByIdMunicipality);
MunicipalityRouter.put("/:id", putMunicipality);
MunicipalityRouter.delete("/:id", deleteMunicipality);

export default MunicipalityRouter;
