import { Request, Response } from 'express'
import { BaseController } from './base.controller'
import { eventModel } from '../models'
import { IEvent } from '../models/event.model'

export class EventController extends BaseController {
    public async findAll(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const items: IEvent[] = await eventModel.find()

            response.status(200).send(items)
        } catch (e) {
            response.status(404).send(e.message)
        }
    }

    public async findAllUpcoming(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const currentDate = new Date()
            const items: IEvent[] = await eventModel.find({
                dateTime: { $gte: currentDate }
            })

            response.status(200).send(items)
        } catch (e) {
            response.status(404).send(e.message)
        }
    }

    public async findAllUpcomingConcerts(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const currentDate = new Date()
            const items: IEvent[] = await eventModel.find({
                dateTime: { $gte: currentDate },
                tags: { $in: ["HORNSAPP"] }
            })

            response.status(200).send(items)
        } catch (e) {
            response.status(404).send(e.message)
        }
    }

    public async findById(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const item = await eventModel
                .findById(request.params.id)
                .populate('activities')
                .populate('venue')
                .populate('state')
                .exec()

            response.status(200).send(item)
        } catch (e) {
            response.status(404).send(e.message)
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: () => any
    ): Promise<void> {
        try {
            const item = await eventModel
                .create(request.body)

            console.log(item)
            response.json(item)
        } catch (error) {
            return next()
        }
    }

    public async upsert(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const item = await eventModel
                .findByIdAndUpdate(request.params.id, {
                    $set: request.body,
                }, {
                    new: true, // Return new object instead of the original
                    upsert: true // True value turn this update into an upsert
                }, function (err, model) {
                    console.log(`Error: ${err}`)
                    if (!model) {
                        const e = new Error(`Data with ${request.params.id} not found.`)
                        throw e
                    } else {
                        return model
                    }
                })

            console.log(`item updated: ${item}`)
            console.log(`request.body updated: ${JSON.stringify(request.body)}`)
            response.status(200).send(item)
        } catch (e) {
            response.status(404).send(e.message)
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: () => any
    ): Promise<void> {
        try {
            const data = await eventModel.findByIdAndRemove(request.params.id)
            response.status(200).json({
                msg: data,
            })
        } catch (error) {
            return next()
        }
    }
}