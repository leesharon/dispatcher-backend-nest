import { UpdateHeadlineDto } from './dtos/update-headline.dto'
import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, Query, UseGuards } from '@nestjs/common'
import { CreateHeadlineDto } from './dtos/create-headline.dto'
import { HeadlinesService } from './headlines.service'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('/api/headlines')
@UseGuards(AuthGuard)
export class HeadlinesController {

    constructor(private readonly headlinesService: HeadlinesService) { }

    @Get()
    async getAll() {
        const headlines = await this.headlinesService.getAll()
        if (!headlines || headlines.length === 0)
            throw new NotFoundException('no headlines found')
        return headlines
    }

    @Get('/pagination')
    async getAllWithPagination(
        @Query('page') page: string,
        @Query('itemsPerPage') itemsPerPage: string
    ) {
        const result = await this.headlinesService.getAllWithPagination(page, itemsPerPage)
        if (!result)
            throw new NotFoundException('no headlines found')
        return result
    }

    @Get('/:id')
    async getById(@Param('id') id: string) {
        const headline = await this.headlinesService.getById(id)
        if (!headline)
            throw new NotFoundException('headline not found')
        return headline
    }

    @Post()
    async create(@Body() body: CreateHeadlineDto) {
        const headline = await this.headlinesService.create(body.headline)
        if (!headline)
            throw new NotFoundException('headline could not be created')
        return headline
    }

    @Put('/:id')
    async update(
        @Param('id') id: string,
        @Body() body: UpdateHeadlineDto
    ) {
        const updatedHeadline = await this.headlinesService.update(id, body.headline)
        if (!updatedHeadline)
            throw new NotFoundException('headline could not be updated')
        return updatedHeadline
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        const deleteHeadline = await this.headlinesService.delete(id)
        if (!deleteHeadline)
            throw new NotFoundException('headline could not be deleted')
        return deleteHeadline
    }
}
