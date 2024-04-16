import { Router } from "express";
import { authenticate } from "../../middlewares/authentication/authentication.js";
import { postServiceMapping } from "../../controllers/serviceMapping/post.js";
import { putServiceMapping } from "../../controllers/serviceMapping/put.js";


const serviceMappingRouter = Router();

serviceMappingRouter.use(authenticate);



serviceMappingRouter.post("/", postServiceMapping);
serviceMappingRouter.put("/:id", putServiceMapping);





export default serviceMappingRouter;
