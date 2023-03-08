import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { User, UserSchema } from './user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service'

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService, UsersRepository, AuthService]
})
export class UsersModule { }
