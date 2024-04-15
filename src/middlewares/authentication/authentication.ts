
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "dd427476-140e-46d1-a9ba-d962e6455f4d",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };