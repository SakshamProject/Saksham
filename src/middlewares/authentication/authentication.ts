
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "87791275-b7f3-4bd0-bdd9-7dc042ca7e05",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };