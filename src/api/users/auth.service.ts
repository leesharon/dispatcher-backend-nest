import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { UsersService } from './users.service'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

@Injectable()
class AuthService {

    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string) {
        const existingUser = await this.usersService.getByEmail(email)
        if (existingUser) throw new BadRequestException('email in use')

        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)

        const createdUser = await this.usersService.create({ email, password: hash })
        const accessToken = this.generateAccessToken(createdUser._id)

        return { createdUser, accessToken }
    }

    async signin(email: string, password: string) {
        const existingUser = await this.usersService.getByEmail(email)
        if (!existingUser) throw new NotFoundException('user not found')

        const match = await bcrypt.compare(password, existingUser.password)
        if (!match) throw new UnauthorizedException('incorrect email or password')

        const userWithoutPassowrd = existingUser.toObject({
            transform: (doc, ret) => {
                delete ret.password
            }
        })
        const accessToken = this.generateAccessToken(existingUser._id)

        return { user: userWithoutPassowrd, accessToken }
    }

    private generateAccessToken(userId: string) {
        return jwt.sign(
            { userId },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: '15m' }
        )
    }

    verifyAccessToken(accessToken: string) {
        return jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET!)
    }
}

export { AuthService }