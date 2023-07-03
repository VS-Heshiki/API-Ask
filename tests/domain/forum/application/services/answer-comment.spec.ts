import { UniqueEntityId } from '@/core/entities'
import { CommentOnAnswerService } from '@/domain/forum/application/services'
import { AnswerCommentRepositoryStub, AnswerRepositoryStub, createAnswer } from '@/tests/mock'

describe('AnswerComment Service', () => {
    let sut: CommentOnAnswerService
    let answerRepositoryMock: AnswerRepositoryStub
    let answerCommentRepositoryMock: AnswerCommentRepositoryStub


    beforeEach(() => {
        answerRepositoryMock = new AnswerRepositoryStub()
        answerCommentRepositoryMock = new AnswerCommentRepositoryStub()

        answerRepositoryMock.create(
            createAnswer({}, new UniqueEntityId('1'))
        )

        sut = new CommentOnAnswerService(answerRepositoryMock, answerCommentRepositoryMock)
    })

    it('should create comment in a answer', async () => {
        const { answerComment } = await sut.execute({
            authorId: '1',
            answerId: new UniqueEntityId('1').toString,
            content: 'new answer comment'
        })

        expect(answerComment.id).toBeTruthy()
        expect(answerCommentRepositoryMock.items[0].content).toBe('new answer comment')
    })
})
