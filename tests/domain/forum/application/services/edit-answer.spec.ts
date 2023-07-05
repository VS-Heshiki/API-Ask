import { EditAnswerService } from '@/domain/forum/application/services'
import { Answer } from '@/domain/forum/enterprise/entities'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { AnswerRepositoryStub, createAnswer } from '@/tests/mock'

describe('EditAnswer Service', () => {
    let sut: EditAnswerService
    let answerRepositoryStub: AnswerRepositoryStub

    beforeEach(async () => {
        answerRepositoryStub = new AnswerRepositoryStub()
        sut = new EditAnswerService(answerRepositoryStub)

        const newAnswer = createAnswer({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('answer-1'))
        await answerRepositoryStub.create(newAnswer)
    })

    it('should be able edit an answer', async () => {
        const saveSpy = vitest.spyOn(answerRepositoryStub, 'save')

        await sut.execute({
            authorId: 'author-1',
            answerId: 'answer-1',
            content: 'Any Content'
        })

        expect(answerRepositoryStub.items[0]).toMatchObject({
            content: 'Any Content'
        })
        expect(saveSpy).toHaveBeenCalledWith(expect.any(Answer))
    })

    it('should avoid edit a answer from another user', async () => {
        const result = await sut.execute({
            authorId: 'author-2',
            answerId: 'answer-1',
            content: 'Any Content'
        })

        expect(result.isLeft).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
