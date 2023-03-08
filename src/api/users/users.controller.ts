import { UpdateUserDto } from './dtos/update-user.dto'
import { Body, Controller, Get, NotFoundException, Param, Put, } from '@nestjs/common'
import { UsersService } from './users.service'

@Controller('/api/users')
class UsersController {

    constructor(private readonly userService: UsersService) { }

    @Get()
    async getAllUsers() {
        const users = await this.userService.getAll()
        if (!users || users.length === 0)
            throw new NotFoundException('no headlines found')
        return users
    }

    @Get('/:id')
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.getById(id)
        if (!user) throw new NotFoundException('user not found')
        return user
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const updatedUser = await this.userService.update(id, body.user)
        if (!updatedUser) throw new NotFoundException('user not found')
        return updatedUser
    }
}

export { UsersController }