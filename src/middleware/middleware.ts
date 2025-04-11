import { Request, Response } from 'express';

export class Middleware {

    constructor(private secrets: String[], private adminSecret: String) {}

    verifyAuthorization = (
        request: Request, 
        response: Response, 
        next: () => any
    ) => {
        const authorization = request.header('Authorization')
        if (!authorization) {
            return response.status(400).json({message: "No authorization."})
        }
        if (!this.secrets.some(s => s === authorization)) {
            return response.status(403).json({message: "Invalid authorization."})        
        }

        return next()
    }

    verifyAdminAuthorization = (
        request: Request,
        response: Response,
        next: () => any
    ) => {
        const authorization = request.header('Authorization')
        if (!authorization) {
            return response.status(400).json({ message: "No authorization." })
        }
        if (authorization !== this.adminSecret) {
            return response.status(403).json({ message: "Invalid authorization." })
        }

        return next()
    }
}