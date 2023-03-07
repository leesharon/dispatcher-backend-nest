import { Module } from '@nestjs/common'
import { HeadlinesController } from './headlines.controller'
import { HeadlinesService } from './headlines.service'
import { HeadlinesRepository } from './headlines.repository'

@Module({
    controllers: [HeadlinesController],
    providers: [HeadlinesService, HeadlinesRepository]
})
export class HeadlinesModule { }
