import  { Router} from "express";
import { getDesignation, postDesignation } from "../../controllers/designation/designation.js";

const designationRouter = Router();

console.log("designatiorouter")


designationRouter.get('/',getDesignation)
designationRouter.post('/',postDesignation)


export default designationRouter;

