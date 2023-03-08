import { UpdateUserDto } from './dtos/update-user.dto'
import { Body, Controller, Get, NotFoundException, Param, Post, Put, Session, UnauthorizedException, UseGuards } from '@nestjs/common'
import { UsersService } from './users.service'
import { AuthService } from './auth.service'
import { SignupDto } from './dtos/signup.dto'
import { CurrentUser } from './decorators/current-user.decorator'
import { AuthGuard } from 'src/guards/auth.guard'

@Controller('/api/users')
class UsersController {

    constructor(
        private readonly userService: UsersService,
        private readonly authService: AuthService
    ) { }

    @Get()
    @UseGuards(AuthGuard)
    async getAllUsers() {
        const users = await this.userService.getAll()
        if (!users || users.length === 0)
            throw new NotFoundException('no headlines found')
        return users
    }

    @Get('/:id')
    @UseGuards(AuthGuard)
    async getUserById(@Param('id') id: string) {
        const user = await this.userService.getById(id)
        if (!user) throw new NotFoundException('user not found')
        return user
    }

    @Put('/:id')
    @UseGuards(AuthGuard)
    async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        const updatedUser = await this.userService.update(id, body.user)
        if (!updatedUser) throw new NotFoundException('user not found')
        return updatedUser
    }

    // Auth Routes
    @Post('/auth/signup')
    async signup(@Body() body: SignupDto, @Session() session: any) {
        const { createdUser, accessToken } = await this.authService.signup(body.credentials.email, body.credentials.password)
        if (!createdUser) throw new NotFoundException('user could not be created')

        accessToken && (session.accessToken = accessToken)
        return createdUser
    }

    @Post('/auth/signin')
    async signin(@Body() body: SignupDto, @Session() session: any) {
        const { user, accessToken } = await this.authService.signin(body.credentials.email, body.credentials.password)
        if (!accessToken) throw new UnauthorizedException('user could not be signed in')

        accessToken && (session.accessToken = accessToken)
        return user
    }

    @Post('/auth/signout')
    signout(@Session() session: any) {
        session.accessToken = null
        return { message: 'signed out' }
    }

    @Get('/auth/loggedinUser')
    async getLoggedInUser(@CurrentUser() user: any) {
        if (!user) throw new NotFoundException('user not found')
        return user
    }
}

export { UsersController }