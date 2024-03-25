import  { Router} from "express";
import { getDesignation, getDesignationById, getDesignationByName, postDesignation } from "../../controllers/designation/designation.js";

const designationRouter = Router();

console.log("designatiorouter")


designationRouter.get('/',getDesignation);
designationRouter.get('/search/:name',getDesignationByName);
designationRouter.get('/:id',getDesignationById);
designationRouter.post('/',postDesignation);
designationRouter.delete('/',);
designationRouter.put("/");


export default designationRouter;

