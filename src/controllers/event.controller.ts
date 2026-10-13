import { Request, Response } from 'express'
import { BaseController } from './base.controller'
import { categoryModel, eventModel } from '../models'
import { IEvent } from '../models/event.model'
import { CLIENT_HIDDEN_CATEGORY_KEYS } from '../constants/categories'

export class EventController extends BaseController {
    /** Exclude IN_REVIEW from client list responses. FOLLOW_UP stays visible (Announced). Detail by id is allowed. */
    private async clientEventFilter(
        extra: Record<string, unknown> = {}
    ): Promise<Record<string, unknown>> {
        const hidden = await categoryModel
            .find({ key: { $in: [...CLIENT_HIDDEN_CATEGORY_KEYS] } })
            .select('_id')
            .lean()

        const hiddenIds = hidden.map((c) => c._id).filter(Boolean)
        if (hiddenIds.length === 0) {
            return { ...extra }
        }

        return {
            ...extra,
            categories: { $nin: hiddenIds },
        }
    }

    /**
     * Still listed while endDate >= now.
     * Every event must have endDate (one-night = dateTime + duration or +2h).
     */
    private upcomingDateFilter(now: Date): Record<string, unknown> {
        return { endDate: { $gte: now } }
    }

    public async findAll(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const items: IEvent[] = await eventModel.find()

            response.status(200).send(items)
        } catch (e) {
            if (e instanceof Error) {
                response.status(404).send(e.message)
            }
        }
    }

    /** Arrow so Express keeps `this` when the method is passed as a route handler. */
    public findAllUpcoming = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const filter = await this.clientEventFilter(
                this.upcomingDateFilter(new Date())
            )
            const items: IEvent[] = await eventModel.find(filter)

            response.status(200).send(items)
        } catch (e) {
            if (e instanceof Error) {
                response.status(404).send(e.message)
            }
        }
    }

    /** Arrow so Express keeps `this` when the method is passed as a route handler. */
    public findAllUpcomingConcerts = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const filter = await this.clientEventFilter({
                ...this.upcomingDateFilter(new Date()),
                isLiveMusicEvent: true,
            })
            const items: IEvent[] = await eventModel.find(filter)

            response.status(200).send(items)
        } catch (e) {
            if (e instanceof Error) {
                response.status(404).send(e.message)
            }
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
            if (e instanceof Error) {
                response.status(404).send(e.message)
            }
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
                })

            console.log(`item updated: ${item}`)
            console.log(`request.body updated: ${JSON.stringify(request.body)}`)
            response.status(200).send(item)
        } catch (e) {
            if (e instanceof Error) {
                response.status(404).send(e.message)
            }
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: () => any
    ): Promise<void> {
        try {
            const data = await eventModel.findByIdAndDelete(request.params.id)
            response.status(200).json({
                msg: data,
            })
        } catch (error) {
            return next()
        }
    }
}
