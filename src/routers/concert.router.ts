import express from 'express';
import { concertController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/all', concertController.findAll)
router.get('/:id', concertController.findById)