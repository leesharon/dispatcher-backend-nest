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

    getAll() {
        return this.userModel.find().lean()
    }

    getById(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid user id')
        return this.userModel.findOne({ _id: new mongoose.Types.ObjectId(id) })
    }

    getByEmail(email: string) {
        return this.userModel.findOne({ email })
    }

    async create(credentials: { email: string, password: string }) {
        const user = await this.userModel.create(credentials)
        return user.toObject({
            transform: (doc, ret) => {
                delete ret.password
            }
        })
    }

    update(id: string, user: Partial<IUser>) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid user id')

        return this.userModel.findOneAndUpdate(
            { _id: new mongoose.Types.ObjectId(id) },
            { ...user as any }, //! Fix this
            { new: true, useFindAndModify: false }
        )
    }

    delete(id: string) {
        if (!mongoose.Types.ObjectId.isValid(id)) throw new BadRequestException('Invalid user id')
        return this.userModel.findByIdAndDelete(id)
    }
}

export { UsersRepository }