import { Router } from "express";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import { postServiceMapping } from "../../controllers/serviceMapping/post.js";


const serviceMappingRouter = Router();

serviceMappingRouter.use(authenticate);



serviceMappingRouter.post("/", postServiceMapping);



export default serviceMappingRouter;
