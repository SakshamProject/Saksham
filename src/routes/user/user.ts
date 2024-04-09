import express from 'express'
import { postUser, getUser } from '../../controllers/user/get.js'


const userRouter = express.Router()
userRouter.get("/",getUser);
userRouter.post("/", postUser);
export default userRouter