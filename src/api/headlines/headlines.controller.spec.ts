import { Test, TestingModule } from '@nestjs/testing'
import { HeadlinesController } from './headlines.controller'

describe('HeadlinesController', () => {
    let controller: HeadlinesController

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [HeadlinesController],
        }).compile()

        controller = module.get<HeadlinesController>(HeadlinesController)
    })

    it('should be defined', () => {
        expect(controller).toBeDefined()
    })
})
