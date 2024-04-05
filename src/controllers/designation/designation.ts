import { Request, Response } from "express";
import {
  createDesignationDB,
  createFeaturesOnDesignationDB,
  deleteDesignationDB,
  getDesignationByID,
  getDesignationByNameDB,
  getDesignationDB,
} from "../../services/database/designation/designation.js";
import getRequestSchema from "../getRequest.schema.js";
import { postRequestSchema } from "./designation.schema.js";
import { createDesignationDBObject, createFeaturesOnDesignationDBObject } from "../../DTO/designation/designation.js";
import { Designation } from "@prisma/client";










