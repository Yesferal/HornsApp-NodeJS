/* Copyright © 2025 Yesferal Cueva. All rights reserved. */

import express from 'express'
import { reviewController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', reviewController.findAll)
router.get('/:id', reviewController.findById)
router.post('/', reviewController.create)
router.put('/:id', reviewController.upsert)
router.delete('/:id', reviewController.delete)
