import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { CreateHeadlineDto } from './dtos/create-headline.dto'

@Controller('/api/headlines')
export class HeadlinesController {
    @Get()
    getHeadlines(): string {
        return 'getHeadlines'
    }

    @Get(':id')
    getHeadlineById(@Param('id') id: string): string {
        console.log('HeadlinesController ~ getHeadlineById ~ id:', id)
        return 'getHeadlineById'
    }

    @Post()
    createHeadline(@Body() body: CreateHeadlineDto): string {
        console.log('HeadlinesController ~ createHeadline ~ body:', body)
        return 'createHeadline'
    }

    @Put(':id')
    updateHeadline(): string {
        return 'updateHeadline'
    }

    @Delete(':id')
    deleteHeadline(): string {
        return 'deleteHeadline'
    }
}
