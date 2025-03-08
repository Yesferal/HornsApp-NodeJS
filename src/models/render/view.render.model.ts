/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'
import { LocalizedStringSchema } from '../util/localized.string.model'

export const ViewRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    data: {
        title: { type: LocalizedStringSchema },
        subtitle: { type: LocalizedStringSchema },
        description: { type: LocalizedStringSchema },
        icon: { type: String },
        imageUrl: { type: String },
        height: { type: Number },
        textColor: { type: String },
        backgroundColor: { type: String },
        visibility: { type: String },
    },
    childs: {
        key: {
            type: String
        },
        ids: [{ type: String }],
        filter: [{ type: String }],
        take: { type: Number },
    },
    navigation: {
        key: {
            type: String
        },
        parameters: {
            param_parcelable_view_data: {
                type: Map,
                of: String
            }
        }
    }
})
