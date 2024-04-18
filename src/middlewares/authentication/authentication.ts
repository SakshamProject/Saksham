
import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "30a3e3de-0242-4998-95f5-79158100bc31",
    };
    log("info", "[middleware/auth] user: %o", user);
    request.user = user;
    
    next();
  }

  export { authenticate };