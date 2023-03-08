import { BadRequestException, Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import mongoose, { Model } from 'mongoose'
import { IUser } from '../../models/user.model'
import { User, UserDocument } from './user.schema'

@Injectable()
class UsersRepository implements OnModuleInit {

    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }
    onModuleInit() {
        if (this.userModel.db.readyState === 1)
            console.log('Users Database connection is ready!')
        else
            console.log('Users Database connection is not ready!')
    }

    async getAll() {
        return this.userModel.find().lean()
    }

    // async getById(id: string) {
    //     if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid headline id')
    //     return this.headlineModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
    // }

    // async create(headline: Partial<IHeadline>) {
    //     return this.headlineModel.create(headline)
    // }

    // async update(id: string, headline: Partial<IHeadline>) {
    //     if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid headline id')

    //     return this.headlineModel.findOneAndUpdate(
    //         { _id: new mongoose.Types.ObjectId(id) },
    //         { ...headline },
    //         { new: true, useFindAndModify: false }
    //     )
    // }

    // async delete(id: string) {
    //     if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid headline id')
    //     return this.headlineModel.findByIdAndDelete(id)
    // }
}

export { UsersRepository }