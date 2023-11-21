import express from 'express'
import { reviewController } from '../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', reviewController.findAll)
router.get('/:id', reviewController.findById)