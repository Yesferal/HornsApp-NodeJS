import { Request, Response } from 'express';
import { BaseController } from './base.controller';
import { concertModel } from '../models';
import { IConcert } from '../models/concert.model';

export class ConcertController extends BaseController {
    public async findAll(
        request: Request, 
        response: Response
    ): Promise<void> {
        try {
            const currentDate = new Date()
            const items: IConcert[] = await concertModel.find({ 
                dateTime: { $gte: currentDate } 
            })
        
            response.status(200).send(items);
          } catch (e) {
            response.status(404).send(e.message);
          }
    }
    
    public async findById(
        request: Request, 
        response: Response
    ): Promise<void> {
        try {
            const item = await concertModel
                .findById(request.params.id)
                .populate('bands')
                .populate('venue')
                .populate('state')
                .exec();
        
            response.status(200).send(item);
        } catch (e) {
            response.status(404).send(e.message);
        }
    }
}