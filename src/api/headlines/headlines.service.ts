import { BadRequestException, Injectable } from '@nestjs/common'
import { IHeadline } from 'src/models/headline.model'
import { HeadlinesRepository } from './headlines.repository'

@Injectable()
export class HeadlinesService {

    constructor(private readonly headlinesRepo: HeadlinesRepository) { }

    getAll() {
        return this.headlinesRepo.getAll()
    }

    getAllWithPagination(page: string, itemsPerPage: string) {
        const pageNumber = parseInt(page as string) || 1
        const itemsPerPageNumber = parseInt(itemsPerPage as string) || 10
        const skip = (pageNumber - 1) * itemsPerPageNumber

        if (itemsPerPageNumber > 100) throw new BadRequestException('itemsPerPage cannot be greater than 100')

        return this.headlinesRepo.getAllWithPagination(pageNumber, itemsPerPageNumber, skip)
    }

    getById(id: string) {
        return this.headlinesRepo.getById(id)
    }

    create(headline: Partial<IHeadline>) {
        return this.headlinesRepo.create(headline)
    }

    update(id: string, headline: Partial<IHeadline>) {
        return this.headlinesRepo.update(id, headline)
    }

    delete(id: string) {
        return this.headlinesRepo.delete(id)
    }
}
