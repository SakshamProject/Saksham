import express from "express";

const MLAConstituencyRouter = express.Router();
MLAConstituencyRouter.post("/",)
MLAConstituencyRouter.get("/", getMLAConstituency)
MLAConstituencyRouter.get("/:id", getByIdMLAConstituency)

export default MLAConstituencyRouter;
