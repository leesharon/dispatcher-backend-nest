import { Injectable } from '@nestjs/common'
import { readFile } from 'fs/promises'
import { IHeadline } from '../../models/headline.model'

@Injectable()
export class HeadlinesRepository {
    async getAll() {
        const headlines = await readFile('./news-us.json', 'utf-8')
        return JSON.parse(headlines)
    }

    async getById(id: string) {
        return 'getHeadlineById'
    }

    async create(headline: Partial<IHeadline>) {
        return 'createHeadline'
    }

    async update() {
        return 'updateHeadline'
    }

    async delete(id: string) {
        return 'deleteHeadline'
    }
}