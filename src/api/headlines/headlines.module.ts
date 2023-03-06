import { Module } from '@nestjs/common'
import { HeadlinesController } from './headlines.controller'

@Module({
    controllers: [HeadlinesController]
})
export class HeadlinesModule { }
