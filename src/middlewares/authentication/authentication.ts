
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "b2282262-78cd-4e6e-8254-353642616a72",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };