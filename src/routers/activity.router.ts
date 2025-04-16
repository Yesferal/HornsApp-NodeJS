import express from 'express';
import { activityController } from '../controllers';

export const router = express.Router({
    strict: true
});

router.get('/', activityController.findAll)
router.get('/:id', activityController.findById)
