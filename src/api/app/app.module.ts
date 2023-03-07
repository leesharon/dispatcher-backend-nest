import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeadlinesModule } from '../headlines/headlines.module'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
        HeadlinesModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
