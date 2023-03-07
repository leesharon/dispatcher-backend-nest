import { Test, TestingModule } from '@nestjs/testing'
import { HeadlinesService } from './headlines.service'

describe('HeadlinesService', () => {
    let service: HeadlinesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HeadlinesService],
        }).compile()

        service = module.get<HeadlinesService>(HeadlinesService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
})
