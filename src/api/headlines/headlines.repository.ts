import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { IHeadline } from '../../models/headline.model'
import { Headline, HeadlineDocument } from './headline.schema'

@Injectable()
export class HeadlinesRepository implements OnModuleInit {

    constructor(
        @InjectModel(Headline.name) private headlineModel: Model<HeadlineDocument>
    ) { }
    onModuleInit() {
        if (this.headlineModel.db.readyState === 1)
            console.log('Database connection is ready!')
        else
            console.log('Database connection is not ready!')
    }

    async getAll() {
        return this.headlineModel.find().lean()
    }

    async getAllWithPagination(page: number, itemsPerPage: number, skip: number) {
        const headlines = await this.headlineModel.find().lean().skip(skip).limit(itemsPerPage)
        if (!headlines) throw new InternalServerErrorException('Could not get headlines')

        const totalItems = await this.headlineModel.countDocuments({})
        const totalPages = Math.ceil(totalItems / itemsPerPage)

        const result = {
            totalItems,
            totalPages,
            currentPage: page,
            itemsPerPage,
            items: headlines,
        }
        return result
    }

    async getById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid headline id')
        return this.headlineModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
    }

    async create(headline: Partial<IHeadline>) {
        return this.headlineModel.create(headline)
    }

    async update(id: string, headline: Partial<IHeadline>) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid headline id')

        return this.headlineModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { ...headline },
            { new: true, useFindAndModify: false }
        )
    }

    async delete(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid headline id')
        return this.headlineModel.findByIdAndDelete(id)
    }
}