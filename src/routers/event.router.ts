import express from 'express';
import { eventController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', eventController.findAllUpcoming)
router.get('/:id', eventController.findById)
