
import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
        id: "616008a9-34b5-410b-8fae-1f4dd8f4d748"
    };
    log("info", "[middleware/auth] user: %o", user);
    request.user = user;
    
    next();
  }

  export { authenticate };