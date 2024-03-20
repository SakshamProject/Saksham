import  { Router} from "express";
import { getDesignation, getDesignationById, postDesignation } from "../../controllers/designation/designation.js";

const designationRouter = Router();

console.log("designatiorouter")


designationRouter.get('/',getDesignation)
designationRouter.get('/:id',getDesignationById)
designationRouter.post('/',postDesignation)
designationRouter.delete('/',)
designationRouter.put("/")


export default designationRouter;

