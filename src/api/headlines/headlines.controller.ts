import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateHeadlineDto } from './dtos/create-headline.dto'

@Controller('/api/headlines')
export class HeadlinesController {
    @Get()
    getAll(): string {
        return 'getHeadlines'
    }

    @Get(':id')
    getById(@Param('id') id: string): string {
        console.log('HeadlinesController ~ getHeadlineById ~ id:', id)
        return 'getHeadlineById'
    }

    @Post()
    create(@Body() body: CreateHeadlineDto): string {
        console.log('HeadlinesController ~ createHeadline ~ body:', body)
        return 'createHeadline'
    }

    @Put(':id')
    update(): string {
        return 'updateHeadline'
    }

    @Delete(':id')
    delete(): string {
        return 'deleteHeadline'
    }
}
