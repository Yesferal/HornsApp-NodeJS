import { Request, Response } from 'express'
import { drawerModel } from '../models'
import { IDrawer } from '../models/drawer.model'

export class DrawerController {

    public async findBy(versionCode: number, platform: string): Promise<IDrawer | undefined> {
        try {
            const item = await drawerModel
                .findOne({
                    versionCode: versionCode,
                    platform: platform
                }) as IDrawer


            return item
        } catch (e) {
            return undefined
        }
    }

    /**
     * ADMIN CRUD
     */
    public async findAll(
        request: Request,
        response: Response
    ): Promise<void> {
        try {
            const items = await drawerModel.find()

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
            const item = await drawerModel
                .findById(request.params.id)
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
            const item = await drawerModel
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
            const item = await drawerModel
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
            const data = await drawerModel.findByIdAndRemove(request.params.id)
            response.status(200).json({
                msg: data,
            })
        } catch (error) {
            return next()
        }
    }
}
