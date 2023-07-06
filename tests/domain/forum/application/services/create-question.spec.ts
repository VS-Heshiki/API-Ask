import { UniqueEntityId } from '@/core/entities'
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
        const result = await sut.execute({
            authorId: '1',
            title: '1',
            content: 'new Create',
            attachmentId: ['1', '2']
        })

        expect(result.isRight()).toBeTruthy()
        expect(result.value?.question.content).toBe('new Create')
        expect(result.value?.question.attachment).toHaveLength(2)
        expect(result.value?.question.attachment).toEqual([
            expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
            expect.objectContaining({ attachmentId: new UniqueEntityId('2') })
        ])
    })
})
