import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { venueModel } from '../models';

export class VenueController extends BaseController {
    public async findAll(
        request: Request, 
        response: Response
    ): Promise<void> {
        try {
            const items = await venueModel
                .find()
                .exec();
        
            response
                .status(200)
                .send(items);
        } catch (e) {
            response
                .status(404)
                .send(e.message);
        }
    }
    
    public async findById(
        request: Request, 
        response: Response
    ): Promise<void> {
        try {
            const item = await venueModel
                .findById(request.params.id)
                .exec();
        
            response
                .status(200)
                .send(item);
        } catch (e) {
            response
                .status(404)
                .send(e.message);
        }
    }
}