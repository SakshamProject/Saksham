
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "a0a1f177-0d76-4896-ac7d-5dc3569cfe9a",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };