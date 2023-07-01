import { EditAnswerService } from '@/domain/forum/application/services'
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

    it('should call Service with correct values', async () => {
        const editSpy = vitest.spyOn(answerRepositoryStub, 'edit')

        await sut.execute({
            authorId: 'author-1',
            answerId: 'answer-1',
            content: 'Any Content'
        })

        expect(answerRepositoryStub.items[0]).toEqual(
            expect.objectContaining({
                content: 'Any Content'
            })
        )
        expect(editSpy).toHaveBeenCalledWith({
            answerId: 'answer-1',
            content: 'Any Content'
        })
    })
})
