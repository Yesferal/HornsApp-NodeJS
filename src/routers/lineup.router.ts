import express from 'express';
import { lineupController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', lineupController.findAll)
router.get('/:id', lineupController.findById)
