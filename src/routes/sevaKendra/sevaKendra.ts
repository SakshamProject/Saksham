import express from "express";
import postSevaKendra from "../../controllers/sevaKendra/post.js";
// import {
//   deleteSevaKendra,
//   getSevaKendra,
//   getSevaKendraById,
//   putSevaKendra,
// } from "../../controllers/sevaKendra/sevaKendra.js";

const sevaKendraRouter = express.Router();

// sevaKendraRouter.get("/", getSevaKendra);
// sevaKendraRouter.get("/:id", getSevaKendraById);
sevaKendraRouter.post("/", postSevaKendra);
// sevaKendraRouter.put("/", putSevaKendra);
// sevaKendraRouter.delete("/:id", deleteSevaKendra);

export default sevaKendraRouter;
