import { BadRequestException, Injectable } from '@nestjs/common'
import { UsersService } from './users.service'
import * as bcrypt from 'bcrypt'

@Injectable()
class AuthService {

    constructor(private usersService: UsersService) { }

    async signup(email: string, password: string) {
        const existingUser = await this.usersService.getByEmail(email)
        if (existingUser) throw new BadRequestException('email in use')

        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds)

        const user = await this.usersService.create({ email, password: hash })
        return user
    }

    // async signin(email: string, password: string) {
    //     const [user] = await this.usersService.find(email)
    //     if (!user) {
    //         throw new NotFoundException('user not found')
    //     }

    //     const [salt, storedHash] = user.password.split('.')

    //     const hash = (await scrypt(password, salt, 32)) as Buffer

    //     if (storedHash !== hash.toString('hex')) {
    //         throw new BadRequestException('bad password')
    //     }

    //     return user
    // }
}

export { AuthService }