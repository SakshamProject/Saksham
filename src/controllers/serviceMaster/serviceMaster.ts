import { Request, Response } from "express";

async function postService(request: Request, response: Response): Promise<void> {
    response.json(request.body);
}

export { postService };