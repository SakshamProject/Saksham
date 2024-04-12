import express from 'express'
import {
  getDivyangDetails,
  getDivyangDetailsbyId,
} from '../../controllers/divyangDetails/get.js'
import { postDivyangDetails } from '../../controllers/divyangDetails/post.js'
import { deleteDivyangDetails } from '../../controllers/divyangDetails/delete.js'
import { putDivyangDetails } from '../../controllers/divyangDetails/put.js'

const divyangDetailsRouter = express.Router()

divyangDetailsRouter.post('/list/', getDivyangDetails)
divyangDetailsRouter.get('/:id', getDivyangDetailsbyId)
divyangDetailsRouter.post('/', postDivyangDetails)
divyangDetailsRouter.put('/:id', putDivyangDetails)
divyangDetailsRouter.delete('/:id', deleteDivyangDetails)

export { divyangDetailsRouter }
