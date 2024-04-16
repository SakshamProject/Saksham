import express from 'express'
import {
  getDivyangDetails,
  getDivyangDetailsbyId,
} from '../../controllers/divyangDetails/get.js'
import { postDivyangDetails } from '../../controllers/divyangDetails/post.js'
import { deleteDivyangDetails } from '../../controllers/divyangDetails/delete.js'
import { putDivyangDetails } from '../../controllers/divyangDetails/put.js'
import fileHandler from '../../middlewares/fileHandler/fileHandler.js'

const divyangDetailsRouter = express.Router()

divyangDetailsRouter.post('/list/', getDivyangDetails)
divyangDetailsRouter.get('/:id', getDivyangDetailsbyId)
divyangDetailsRouter.post(
  '/',
  fileHandler.single('picture'),
  postDivyangDetails,
)
divyangDetailsRouter.put(
  '/:id',
  fileHandler.fields([
    { name: 'picture', maxCount: 1 },
    { name: 'voterId', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'drivingLicense', maxCount: 1 },
    { name: 'rationCard', maxCount: 1 },
    { name: 'aadharCard', maxCount: 1 },
    { name: 'pensionCard', maxCount: 1 },
    { name: 'medicalInsuranceCard', maxCount: 1 },
    { name: 'disabilitySchemeNumber', maxCount: 1 },
    { name: 'BPL_OR_APL_Number', maxCount: 1 },
    { name: 'disabilityCard', maxCount: 1 },
    { name: 'UDIDCard', maxCount: 1 }
  ]),
  putDivyangDetails,
)
// divyangDetailsRouter.delete('/:id', deleteDivyangDetails)

export { divyangDetailsRouter }
