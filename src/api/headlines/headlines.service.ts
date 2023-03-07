import { Injectable } from '@nestjs/common'
import { IHeadline } from 'src/models/headline.model'
import { HeadlinesRepository } from './headlines.repository'

@Injectable()
export class HeadlinesService {

    constructor(public headlinesRepo: HeadlinesRepository) { }

    getAll() {
        return this.headlinesRepo.getAll()
    }

    getById(id: string) {
        return this.headlinesRepo.getById(id)
    }

    create(headline: Partial<IHeadline>) {
        return this.headlinesRepo.create(headline)
    }

    update() {
        return this.headlinesRepo.update()
    }

    delete(id: string) {
        return this.headlinesRepo.delete(id)
    }
}
