import { Body, Controller, Delete, Get, Param, Post, Put, NotFoundException, Query } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('/api/headlines')
class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUsers() {
        const headlines = await this.userService.getAll()
        if (!headlines || headlines.length === 0)
            throw new NotFoundException('no headlines found')
        return headlines
    }

    // @Get('/:id')
    // async getUserById(@Param('id') id: string) {
    //     const headline = await this.userService.getById(id)
    //     if (!headline)
    //         throw new NotFoundException('headline not found')
    //     return headline
    // }

    // @Put('/:id')
    // async updateUser(@Param('id') id: string, @Body() user: User) {
    //     const updatedHeadline = await this.userService.update(id, headline)
    //     if (!updatedHeadline)
    //         throw new NotFoundException('headline not found')
    //     return updatedHeadline
    // }
}

export { UsersController }