/* Copyright © 2025 Yesferal Cueva. All rights reserved. */

import express from 'express'
import { appRenderController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', appRenderController.findAll)
router.get('/:id', appRenderController.findById)
router.post('/', appRenderController.create)
router.put('/:id', appRenderController.upsert)
router.delete('/:id', appRenderController.delete)
