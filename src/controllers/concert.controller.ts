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
            const items: IConcert[] = await concertModel.find();
        
            response.status(200).send(items);
          } catch (e) {
            response.status(404).send(e.message);
          }
    }
    
    public async find(
        request: Request, 
        response: Response
        ): Promise<void> {
        throw new Error("Method not implemented.");
    }
}