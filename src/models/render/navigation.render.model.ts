/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'

export const NavigationRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    parameters: {
        param_parcelable_view_data: {
            type: Map,
            of: String
        },
        param_android_uri: { type: String }
    }
})
