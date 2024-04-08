import express from 'express'
import { getDivyangDetails, getDivyangDetailsbyId } from '../../controllers/divyangDetails/get.js'

const divyangDetailsRouter = express.Router()

divyangDetailsRouter.get("/", getDivyangDetails)
divyangDetailsRouter.get("/", getDivyangDetailsbyId)

export { divyangDetailsRouter }