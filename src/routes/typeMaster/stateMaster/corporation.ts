import express from "express";
import { postCorporation } from "../../../controllers/typeMaster/stateMaster/corporation/post.js";
import {
  getCorporationByDistrictId,
  getCorporationById,
  getCorporation,
} from "../../../controllers/typeMaster/stateMaster/corporation/get.js";
import { putCorporation } from "../../../controllers/typeMaster/stateMaster/corporation/put.js";
import { deleteCorporation } from "../../../controllers/typeMaster/stateMaster/corporation/delete.js";

const CorporationRouter = express.Router();
CorporationRouter.post("/", postCorporation);
CorporationRouter.get("/", getCorporation);
CorporationRouter.get("/:id", getCorporationById);
CorporationRouter.put("/:id", putCorporation);
CorporationRouter.delete("/:id", deleteCorporation);
CorporationRouter.get("/districts/:districtId", getCorporationByDistrictId);

export default CorporationRouter;
