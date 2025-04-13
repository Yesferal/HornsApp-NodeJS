import express from 'express'
import { eventController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', eventController.findAll)
router.get('/:id', eventController.findById)
router.post('/', eventController.create)
router.put('/:id', eventController.upsert)
router.delete('/:id', eventController.delete)
