/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'
import { NavigationRenderScheme } from './navigation.render.model'
import { DataRenderScheme } from './data.render.model'
import { StyleRenderScheme } from './style.render.model'

export const ViewRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    data: { type: DataRenderScheme },
    style: { type: StyleRenderScheme },
    children: {
        key: {
            type: String
        },
        filter: {
            events: [{ type: String }],
            categories: [{ type: String }]
        },
        sort: [{ type: String }],
        take: { type: Number },
    },
    navigation: { type: NavigationRenderScheme }
})
