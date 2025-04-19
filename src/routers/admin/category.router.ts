/* Copyright © 2025 HornsApp. All rights reserved. */

import express from 'express'
import { categoryController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', categoryController.findAll)
router.get('/:id', categoryController.findById)
router.post('/', categoryController.create)
router.put('/:id', categoryController.upsert)
router.delete('/:id', categoryController.delete)
