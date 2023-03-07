import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException } from '@nestjs/common'
import { CreateHeadlineDto } from './dtos/create-headline.dto'
import { HeadlinesService } from './headlines.service'

@Controller('/api/headlines')
export class HeadlinesController {

    //TODO  typescript workaround for interface
    constructor(public headlinesService: HeadlinesService) { }

    @Get()
    getAll() {
        return this.headlinesService.getAll()
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        const headline = await this.headlinesService.getById(id)
        if (!headline) throw new NotFoundException('headline not found')
        return headline
    }

    @Post()
    create(@Body() body: CreateHeadlineDto) {
        return this.headlinesService.create(body.headline)
    }

    @Put(':id')
    update() {
        return this.headlinesService.update()
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.headlinesService.delete(id)
    }
}
