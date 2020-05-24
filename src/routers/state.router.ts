import express from 'express';
import { stateController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', stateController.findAll)
router.get('/:id', stateController.findById)