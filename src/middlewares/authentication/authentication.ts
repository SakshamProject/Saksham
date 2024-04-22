
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "e9f5e715-5d4e-4725-bf3f-42a8be95a01d",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };