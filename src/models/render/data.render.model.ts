/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'
import { LocalizedStringSchema } from '../util/localized.string.model'

export const DataRenderScheme: Schema = new Schema({
    title: { type: LocalizedStringSchema },
    subtitle: { type: LocalizedStringSchema },
    description: { type: LocalizedStringSchema },
    icon: { type: String },
    imageUrl: { type: String },
})
