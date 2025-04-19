/* Copyright © 2025 HornsApp. All rights reserved. */

import mongoose, { Schema, Document } from 'mongoose'
import { ViewRenderScheme } from './view.render.model'

export interface IAppRender extends Document {
    platform: string,
    docVersion: number,
    appVersion: number,
}

const AppRenderScheme: Schema = new Schema({
    platform: {
        type: String
    },
    appId: {
        type: String
    },
    docVersion: {
        type: Number
    },
    appVersion: {
        type: Number
    },
    screens: [{ type: Schema.Types.ObjectId, ref: 'Screen_Render' }],
    categories: [{ type: ViewRenderScheme }]
})

export const appRenderModel = mongoose.model<IAppRender>('App_Render', AppRenderScheme)
