/* Copyright © 2025 HornsApp. All rights reserved. */

import mongoose, { Schema, Document } from 'mongoose'
import { ViewRenderScheme } from './view.render.model'
import { ScreenRenderScheme } from './screen.render.model'

export interface IAppRender extends Document {
    platform: string,
    docVersion: number,
    appVersion: number,
}

const AppRenderScheme: Schema = new Schema({
    platform: {
        type: String
    },
    docVersion: {
        type: Number
    },
    appVersion: {
        type: Number
    },
    screens: [{ type: ScreenRenderScheme }],
    categories: [{ type: ViewRenderScheme }]
})

export const appRenderModel = mongoose.model<IAppRender>('App_Render', AppRenderScheme)
