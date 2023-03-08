import { Injectable } from '@nestjs/common'
import { IUser } from 'src/models/user.model'
import { UsersRepository } from './users.repository'

@Injectable()
class UsersService {

    constructor(private readonly usersRepo: UsersRepository) { }

    getAll() {
        return this.usersRepo.getAll()
    }

    getById(id: string) {
        return this.usersRepo.getById(id)
    }

    create(user: Partial<IUser>) {
        return this.usersRepo.create(user)
    }

    update(id: string, user: Partial<IUser>) {
        return this.usersRepo.update(id, user)
    }

    delete(id: string) {
        return this.usersRepo.delete(id)
    }
}

export { UsersService }