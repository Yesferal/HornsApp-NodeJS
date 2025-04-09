/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'
import { NavigationRenderScheme } from './navigation.render.model'
import { DataRenderScheme } from './data.render.model'

export const ViewRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    data: { type: DataRenderScheme },
    children: {
        key: {
            type: String
        },
        values: [{ type: String }],
        filter: { type: String },
        sort: { type: String },
        take: { type: Number },
    },
    navigation: { type: NavigationRenderScheme }
})
