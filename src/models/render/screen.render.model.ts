/* Copyright © 2025 HornsApp. All rights reserved. */

import mongoose, { Schema, Document } from 'mongoose'
import { ViewRenderScheme } from './view.render.model'

export interface IScreenRender extends Document {
    views: IType[]
}

interface IType {
    key: string
}

const ScreenRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    title: {
        en: { type: String },
        es: { type: String }
    },
    views: [{ type: ViewRenderScheme }],
})

export const screenRenderModel = mongoose.model<IScreenRender>('Screen_Render', ScreenRenderScheme)
