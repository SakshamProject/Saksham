import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "b2282262-78cd-4e6e-8254-353642616a72",
    };
    log("info", "[middleware/auth] user: %o", user);
    request.user = user;
    
    next();
  }

  export { authenticate };