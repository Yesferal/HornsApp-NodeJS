/* Copyright © 2025 HornsApp. All rights reserved. */

import { Request, Response } from 'express'
import { BaseController } from './base.controller'
import { cardViewModel } from '../models/render/view.render.model'

export class CardController extends BaseController {
    public async findAll(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const items = await cardViewModel
                .find()
                .exec()

            response
                .status(200)
                .send(items)
        } catch (e) {
            if (e instanceof Error) {
                response
                .status(404)
                .send(e.message)
            }
        }
    }

    public async findById(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const item = await cardViewModel
                .findById(request.params.id)
                .exec()

            response
                .status(200)
                .send(item)
        } catch (e) {
            if (e instanceof Error) {
                response
                .status(404)
                .send(e.message)
            }
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: () => any
    ): Promise<void> {
        try {
            const item = await cardViewModel
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
            const item = await cardViewModel
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
            const data = await cardViewModel.findByIdAndDelete(request.params.id)
            response.status(200).json({
                msg: data,
            })
        } catch (error) {
            return next()
        }
    }
}
