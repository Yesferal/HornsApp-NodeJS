import express from 'express'
import { appRenderController } from '../controllers'

export const router = express.Router({
    strict: true
})

router.get('/', appRenderController.findByAppParams)
