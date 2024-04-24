import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "5927282b-cdc5-48d2-89b0-446cad21707a",
    };
    log("info", "[middleware/auth] user: %o", user);
    request.user = user;
    
    next();
  }

  export { authenticate };