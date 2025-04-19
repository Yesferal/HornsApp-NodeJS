/* Copyright © 2025 HornsApp. All rights reserved. */

import mongoose, { Schema, Document } from 'mongoose'
import { LocalizedStringSchema } from './util/localized.string.model'

export interface ICategory extends Document {
    key: String
}

export const CategoryRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    name: { type: LocalizedStringSchema },
})

export const categoryModel = mongoose.model<ICategory>('Category', CategoryRenderScheme)
