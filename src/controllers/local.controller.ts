import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { localModel } from '../models';

export class LocalController extends BaseController {
    public async findAll(
        request: Request, 
        response: Response
    ): Promise<void> {
        try {
            const items = await localModel
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
            const item = await localModel
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