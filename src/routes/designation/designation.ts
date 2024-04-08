import  { Router} from "express";
import { postDesignation } from "../../controllers/designation/post.js";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import { getDesignationById } from "../../controllers/designation/get.js";


const designationRouter = Router();

designationRouter.use(authenticate);

// designationRouter.get('/',getDesignation);
// designationRouter.get('/search/:name',getDesignationByName);
designationRouter.get('/:id',getDesignationById);
designationRouter.post('/',postDesignation);
// designationRouter.delete('/:id',deleteDesignation);
// designationRouter.put('/:id',);



export default designationRouter;

