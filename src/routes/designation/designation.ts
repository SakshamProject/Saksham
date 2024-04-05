import  { Router} from "express";
import { postDesignation } from "../../controllers/designation/post.js";

const designationRouter = Router();

designationRouter.get('/',getDesignation);
designationRouter.get('/search/:name',getDesignationByName);
designationRouter.get('/:id',getDesignationById);
designationRouter.post('/',postDesignation);
designationRouter.delete('/:id',deleteDesignation);
designationRouter.put('/:id',)



export default designationRouter;

