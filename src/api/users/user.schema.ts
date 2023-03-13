/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type UserDocument = Document<User>

@Schema({ collection: 'user' })
export class User {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    })
    _id: string

    @Prop({ required: false })
    name: string

    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true, select: false })
    password: string

    @Prop({ type: [String], required: false })
    favoriteHeadlinesIds: string[]

    @Prop({ type: [Object], required: false })
    notifications: Notification[]

    @Prop({ required: false })
    lastSignInTime: number

    @Prop({ required: false })
    photoURL: string
}

export const UserSchema = SchemaFactory.createForClass(User)