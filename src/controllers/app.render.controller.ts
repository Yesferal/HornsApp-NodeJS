import { Request, Response } from 'express'
import { appRenderModel } from '../models'
import { IAppRender } from '../models/render/app.render.model'

export class AppRenderController {

    public findByAppParams = async (
        request: Request,
        response: Response
    ): Promise<void> => {
        try {
            const appVersion = Number(request.query.appVersion?.toString())
            const platform = request.query.platform?.toString()
            const appId = request.query.appId?.toString()

            if (appVersion && platform && appId) {
                const item = await this.findBy(appVersion, platform, appId)

                if (item) {
                    response.status(200).send(item)
                } else {
                    response.status(400).json({ error: "No json AppRender available" })
                }
            } else {
                response.status(400).json({ error: "No json AppRender available" })
            }
        } catch (e) {
            if (e instanceof Error) {
                response.status(404).send(e.message)
            }
        }
    }

    public async findBy(appVersion: number, platform: string, appId: string): Promise<IAppRender | undefined> {
        try {
            const item = await appRenderModel
                .findOne({
                    appId: appId,
                    appVersion: { $gte: appVersion },   // greater than or equal
                    platform: { $in: [platform] }       // platform exists in array
                })
                .sort({ appVersion: 1 })              // lowest valid version first
                .populate('screens')
                .populate('categories')
                .exec() as IAppRender

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
            const items = await appRenderModel.find()

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
            const item = await appRenderModel
                .findById(request.params.id)
                .populate('screens')
                .populate('categories')
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
            const item = await appRenderModel
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
            const item = await appRenderModel
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
            const data = await appRenderModel.findByIdAndDelete(request.params.id)
            response.status(200).json({
                msg: data,
            })
        } catch (error) {
            return next()
        }
    }
}
