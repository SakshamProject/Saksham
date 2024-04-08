import { NextFunction, Request, Response } from "express";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
      id: "d11db683-299d-4743-88da-7d9a9f23ce74",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };