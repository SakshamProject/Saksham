import  { Router} from "express";
import { getDesignation } from "../../controllers/designation/designation.js";

const designationRouter = Router();

console.log("[+]enters designationRouter")


designationRouter.get('/',getDesignation)



export default designationRouter;

