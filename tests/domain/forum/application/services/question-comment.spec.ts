import { UniqueEntityId } from '@/core/entities'
import { CommentOnQuestionService } from '@/domain/forum/application/services'
import { QuestionCommentRepositoryStub, QuestionRepositoryStub, createQuestion } from '@/tests/mock'

describe('QuestionComment Service', () => {
    let sut: CommentOnQuestionService
    let questionRepositoryMock: QuestionRepositoryStub
    let questionCommentRepositoryMock: QuestionCommentRepositoryStub


    beforeEach(() => {
        questionRepositoryMock = new QuestionRepositoryStub()
        questionCommentRepositoryMock = new QuestionCommentRepositoryStub()

        questionRepositoryMock.create(
            createQuestion({}, new UniqueEntityId('1'))
        )

        sut = new CommentOnQuestionService(questionRepositoryMock, questionCommentRepositoryMock)
    })

    it('should create comment in a question', async () => {
        const { questionComment } = await sut.execute({
            authorId: '1',
            questionId: new UniqueEntityId('1').toString,
            content: 'new question comment'
        })

        expect(questionComment.id).toBeTruthy()
        expect(questionCommentRepositoryMock.items[0].content).toBe('new question comment')
    })
})
