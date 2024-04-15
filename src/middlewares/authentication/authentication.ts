
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "a09e0bf1-e9c5-4970-9969-d4c761f12be8",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };