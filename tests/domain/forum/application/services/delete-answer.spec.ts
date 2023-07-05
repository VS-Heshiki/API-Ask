import { DeleteAnswerService } from '@/domain/forum/application/services'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { AnswerRepositoryStub, createAnswer } from '@/tests/mock'


describe('DeleteAnswer Service', () => {
    let sut: DeleteAnswerService
    let answerRepositoryStub: AnswerRepositoryStub

    beforeEach(async () => {
        answerRepositoryStub = new AnswerRepositoryStub()
        sut = new DeleteAnswerService(answerRepositoryStub)

        const newAnswer = createAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'))
        await answerRepositoryStub.create(newAnswer)
    })

    it('should call Service with correct values', async () => {
        const spyDelete = vitest.spyOn(answerRepositoryStub, 'delete')

        await sut.execute({
            authorId: 'author-1',
            answerId: 'answer-1'
        })

        expect(answerRepositoryStub.items).toHaveLength(0)
        expect(spyDelete).toHaveBeenCalledWith('answer-1')
    })

    it('should avoid delete a answer from another user', async () => {
        const result = await sut.execute({
            authorId: 'author-2',
            answerId: 'answer-1'
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
