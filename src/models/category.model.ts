/* Copyright © 2025 HornsApp. All rights reserved. */

import mongoose, { Schema, Document } from 'mongoose'
import { LocalizedStringSchema } from './util/localized.string.model'
import { Types } from "mongoose"

export interface ICategory extends Document  {
  _id: Types.ObjectId
  key: string
  name: {
    en: string
    es: string
  }
  description?: {
    en: string
    es: string
  }
}
export const CategoryRenderScheme: Schema = new Schema({
    key: {
        type: String
    },
    name: { type: LocalizedStringSchema },
    description: { type: LocalizedStringSchema },
})

export const categoryModel = mongoose.model<ICategory>('Category', CategoryRenderScheme)
