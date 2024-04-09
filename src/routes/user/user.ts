import express from 'express'
import { getUser } from '../../controllers/user/get.js'


const userRouter = express.Router()
userRouter.get("/",getUser)
export default userRouter