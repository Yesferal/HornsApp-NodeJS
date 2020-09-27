import express from 'express';
import { venueController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', venueController.findAll)
router.get('/:id', venueController.findById)