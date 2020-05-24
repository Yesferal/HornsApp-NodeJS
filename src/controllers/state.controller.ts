import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { stateModel } from '../models';

export class StateController extends BaseController {
    public async findAll(
        request: Request, 
        response: Response
    ): Promise<void> {
        try {
            const items = await stateModel
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
            const item = await stateModel
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