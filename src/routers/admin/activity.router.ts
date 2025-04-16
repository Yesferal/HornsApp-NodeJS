import express from 'express'
import { activityController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', activityController.findAll)
router.get('/:id', activityController.findById)
router.post('/', activityController.create)
router.put('/:id', activityController.upsert)
router.delete('/:id', activityController.delete)
