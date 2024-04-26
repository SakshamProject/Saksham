import { NextFunction, Request, Response } from "express";
import log from "../../services/logger/logger.js";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "f32bb2ec-5236-40aa-870e-814ea8eef8af",
    };
    log("info", "[middleware/auth] user: %o", user);
    request.user = user;
    
    next();
  }

  export { authenticate };