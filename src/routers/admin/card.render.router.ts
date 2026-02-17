/* Copyright © 2025 HornsApp. All rights reserved. */

import express from 'express'
import { cardController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', cardController.findAll)
router.get('/:id', cardController.findById)
router.post('/', cardController.create)
router.put('/:id', cardController.upsert)
router.delete('/:id', cardController.delete)
