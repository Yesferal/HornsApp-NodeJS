import { Request, Response } from 'express';

export abstract class BaseController {
    public async abstract findAll(request: Request, response: Response): Promise<void>; 
    public async abstract findById(request: Request, response: Response): Promise<void>;
}