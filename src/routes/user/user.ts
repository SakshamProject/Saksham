import express from 'express'
import { getUser, getUserById } from '../../controllers/user/get.js'


const userRouter = express.Router()
userRouter.get("/", getUser)
userRouter.get("/:id",getUserById)
export default userRouter