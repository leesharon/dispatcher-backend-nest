import { Module } from '@nestjs/common'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'
import { UsersRepository } from './users.repository'
import { User, UserSchema } from './user.schema'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthService } from './auth.service'
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [
        UsersService,
        UsersRepository,
        AuthService,
        {
            provide: APP_INTERCEPTOR,
            useClass: CurrentUserInterceptor,
        }
    ]
})
export class UsersModule { }
