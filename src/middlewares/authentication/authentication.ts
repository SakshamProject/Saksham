
import { NextFunction, Request, Response } from "express";


function authenticate(request: Request, response: Response, next: NextFunction) {
    const user:User = {
      id: "73a0addb-309e-41c3-9902-a216e41ca8ff",
    };
    
    request.user = user;
    
    next();
  }

  export { authenticate };