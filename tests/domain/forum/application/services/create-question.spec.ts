import { QuestionRepository } from '@/domain/forum/application/repositories'
import { CreateQuestionService } from '@/domain/forum/application/services'

import { MockProxy, mock } from 'vitest-mock-extended'

describe('CreateQuestion Service', () => {
    let sut: CreateQuestionService
    let CreateRepositoryMock: MockProxy<QuestionRepository>

    beforeEach(() => {
        CreateRepositoryMock = mock()
        sut = new CreateQuestionService(CreateRepositoryMock)
    })

    it('should create an Question', async () => {
        const { question } = await sut.execute({
            authorId: '1',
            title: '1',
            content: 'new Create'
        })

        expect(question.id).toBeTruthy()
        expect(question.content).toBe('new Create')
    })
})
