import { Router } from "express";
import { authenticate } from "../../middlewares/authentication/authentication.js";


const serviceMappingRouter = Router();

serviceMappingRouter.use(authenticate);



serviceMappingRouter.post("/", );


export default serviceMappingRouter;
