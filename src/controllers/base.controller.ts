import { Request, Response } from 'express';

export abstract class BaseController {
    public abstract findAll(request: Request, response: Response): Promise<void>; 
    public abstract findById(request: Request, response: Response): Promise<void>;
}