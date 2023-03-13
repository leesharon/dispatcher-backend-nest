/* eslint-disable indent */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Document } from 'mongoose'

export type HeadlineDocument = Document & Headline

@Schema({ collection: 'headline' })
export class Headline {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId
    })
    _id: mongoose.Schema.Types.ObjectId

    @Prop({
        type: {
            id: { type: String || null },
            name: { type: String },
        },
        required: true,
        _id: false,
    })
    source: {
        id: string | null;
        name: string;
    }

    @Prop({ type: String, required: true })
    author: string

    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: String, required: true })
    description: string

    @Prop({ type: String, required: true })
    url: string

    @Prop({ type: String, required: true })
    urlToImage: string

    @Prop({ type: String, required: true })
    publishedAt: string

    @Prop({ type: String, required: true })
    content: string
}

export const HeadlineSchema = SchemaFactory.createForClass(Headline)