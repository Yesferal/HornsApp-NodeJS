import express from 'express';
import { localController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', localController.findAll)
router.get('/:id', localController.findById)