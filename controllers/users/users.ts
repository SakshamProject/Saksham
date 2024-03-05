import { getUserDB } from "../../src/services/database/users/userDB.js";
import express, {Request, Response, Router} from "express";
const getUser = async (req: Request, res: Response) => {
    const user = await getUserDB();
    res.send(user)
}
export { getUser };