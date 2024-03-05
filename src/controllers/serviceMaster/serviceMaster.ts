import { Request, Response } from "express";

async function postService(request: Request, response: Response): Promise<void> {
    response.json(request.body);
}

async function getService(request: Request, response: Response): Promise<void> {

}

export { postService, getService };