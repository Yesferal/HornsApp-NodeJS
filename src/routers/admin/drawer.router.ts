/* Copyright © 2025 Yesferal Cueva. All rights reserved. */

import express from 'express'
import { drawerController } from '../../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', drawerController.findAll)
router.get('/:id', drawerController.findById)
router.post('/', drawerController.create)
router.put('/:id', drawerController.upsert)
router.delete('/:id', drawerController.delete)
