import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
    views: IType[]
}

interface IType {
    key: string,
    title: ITitle,
    subTitle: ITitle,
    imageUrl: string
}

interface ITitle {
    en: string,
    es: string
}

const ReviewScheme: Schema = new Schema({
    views: [{
        key: {
            type: String
        },
        data: {
            title: {
                en: { type: String },
                es: { type: String }
            },
            subtitle: {
                en: { type: String },
                es: { type: String }
            },
            description: {
                en: { type: String },
                es: { type: String }
            },
            icon: { type: String },
            imageUrl: { type: String },
            height: { type: Number },
            textColor: { type: String },
            backgroundColor: { type: String }
        },
        condition: {
            key: {
                type: String
            },
            defaultValues: [{ type: String }],
            filterBy: {
                type: String
            },
            count: {
                type: Number
            },
        },
        navigation: {
            key: {
                type: String
            },
            parameters: {
                type: Map,
                of: String
            }
        }
    }],
    key: {
        type: String
    },
    title: {
        en: { type: String },
        es: { type: String }
    }
})

export const reviewModel = mongoose.model<IReview>('Review', ReviewScheme)