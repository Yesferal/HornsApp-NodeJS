import mongoose, { Schema, Document } from 'mongoose'

export interface IDrawer extends Document {
    screens: IType[],
    categories: IType[]
}

interface IType {
    key: string,
    title: ITitle
}

interface ITitle {
    en: string,
    es: string
}

const DrawerScheme: Schema = new Schema({
    platform: {
        type: String
    },
    versionCode: {
        type: Number
    },
    screens: [{
        key: {
            type: String
        },
        data: {
            title: {
                en: { type: String },
                es: { type: String }
            }
        }
    }],
    newest: [{
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
    categories: [{
        key: {
            type: String
        },
        data: {
            title: {
                en: { type: String },
                es: { type: String }
            }
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
    }]
})

export const drawerModel = mongoose.model<IDrawer>('Drawer', DrawerScheme)
