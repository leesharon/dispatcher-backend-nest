import { Module } from '@nestjs/common'
import { HeadlinesController } from './headlines.controller'
import { HeadlinesService } from './headlines.service';

@Module({
    controllers: [HeadlinesController],
    providers: [HeadlinesService]
})
export class HeadlinesModule { }
