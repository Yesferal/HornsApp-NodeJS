/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'
import { LocalizedStringSchema } from '../util/localized.string.model'
import { NavigationRenderScheme } from './navigation.render.model'

export const DataRenderScheme: Schema = new Schema({
    key: { type: String },
    title: { type: LocalizedStringSchema },
    subtitle: { type: LocalizedStringSchema },
    description: { type: LocalizedStringSchema },
    icon: { type: String },
    imageUrl: { type: String },
    width: { type: Number },
    height: { type: Number },
    textColor: { type: String },
    backgroundColor: { type: String },
    elevation: { type: Boolean },
    ctas: [{
        title: { type: LocalizedStringSchema },
        textColor: { type: String },
        backgroundColor: { type: String },
        align: { type: String },
        navigation: { type: NavigationRenderScheme }
    }],
    visibility: { type: Boolean }
})
