import { BadRequestException, Injectable } from '@nestjs/common'
import { IHeadline } from 'src/models/headline.model'
import { UsersRepository } from './users.repository'

@Injectable()
class UsersService {

    constructor(private readonly usersRepo: UsersRepository) { }

    getAll() {
        return this.usersRepo.getAll()
    }

    // getById(id: string) {
    //     return this.headlinesRepo.getById(id)
    // }

    // create(headline: Partial<IHeadline>) {
    //     return this.headlinesRepo.create(headline)
    // }

    // update(id: string, headline: Partial<IHeadline>) {
    //     return this.headlinesRepo.update(id, headline)
    // }

    // delete(id: string) {
    //     return this.headlinesRepo.delete(id)
    // }
}

export { UsersService }