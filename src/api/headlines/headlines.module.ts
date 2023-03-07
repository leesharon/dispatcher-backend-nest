import { Module } from '@nestjs/common'
import { HeadlinesController } from './headlines.controller'
import { HeadlinesService } from './headlines.service'
import { HeadlinesRepository } from './headlines.repository'
import { Headline, HeadlineSchema } from './headline.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
    imports: [MongooseModule.forFeature([{ name: Headline.name, schema: HeadlineSchema }])],
    controllers: [HeadlinesController],
    providers: [HeadlinesService, HeadlinesRepository]
})
export class HeadlinesModule { }
