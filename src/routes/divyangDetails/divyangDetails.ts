import express from 'express'
import { getDivyangDetails } from '../../controllers/divyangDetails/get.js'

const divyangDetailsRouter = express.Router()

divyangDetailsRouter.get("/", getDivyangDetails)
