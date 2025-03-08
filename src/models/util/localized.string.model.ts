/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'

export const LocalizedStringSchema: Schema = new Schema({
    en: { type: String },
    es: { type: String }
})
