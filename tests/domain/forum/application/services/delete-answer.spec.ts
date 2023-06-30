import { DeleteAnswerService } from '@/domain/forum/application/services'
import { AnswerRepository } from '@/domain/forum/application/repositories'
import { Answer } from '@/domain/forum/enterprise/entities'
import { createAnswer } from '@/tests/mock'
import { UniqueEntityId } from '@/core/entities'

import { MockProxy, mock } from 'vitest-mock-extended'

describe('DeleteAnswer Service', () => {
    let sut: DeleteAnswerService
    let answerRepositoryMock: MockProxy<AnswerRepository>
    let newAnswer: Answer

    beforeEach(() => {
        answerRepositoryMock = mock()
        newAnswer = createAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'))
        sut = new DeleteAnswerService(answerRepositoryMock)
    })

    it.todo('should call Service with correct values', async () => {
        // await sut.execute({
        //     authorId: newAnswer.authorId.toString,
        //     answerId: newAnswer.id.toString
        // })

        // expect(sut.execute).toHaveBeenCalledWith({ authorId: 'author-1', answerId: 'answer-1' })
    })

    it('should avoid delete a answer from another user ', async () => {
        await expect(
            sut.execute({
                authorId: 'author-2',
                answerId: newAnswer.id.toString
            })
        ).rejects.toBeInstanceOf(Error)
    })
})
