import { NextFunction, Request, Response } from "express";

function authenticate(request: Request, response: Response, next: NextFunction) {
    const user: User = {
      id: "55716a20-1523-4a0c-8e34-1d4d998db52a",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };