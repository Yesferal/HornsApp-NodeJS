import express from 'express';
import { bandController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', bandController.findAll)
router.get('/:id', bandController.findById)