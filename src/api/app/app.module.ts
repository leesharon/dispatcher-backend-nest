import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { HeadlinesModule } from '../headlines/headlines.module'

@Module({
    imports: [HeadlinesModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
