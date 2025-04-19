/* Copyright © 2025 HornsApp. All rights reserved. */

import { Schema } from 'mongoose'

export const StyleRenderScheme: Schema = new Schema({
    width: { type: Number },
    height: { type: Number },
    textColor: { type: String },
    backgroundColor: { type: String },
    elevation: { type: Boolean },
    visibility: { type: Boolean },
})
