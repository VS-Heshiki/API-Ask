import { UniqueEntityId } from '@/core/entities'
import { FetchQuestionCommentService } from '@/domain/forum/application/services'
import { QuestionCommentRepositoryStub, createQuestionComment } from '@/tests/mock'

describe('FetchQuestionComment Service', () => {
    let sut: FetchQuestionCommentService
    let questionCommentRepositoryStub: QuestionCommentRepositoryStub

    beforeEach(async () => {
        questionCommentRepositoryStub = new QuestionCommentRepositoryStub()
        sut = new FetchQuestionCommentService(questionCommentRepositoryStub)
    })

    it('should fetch 20 comments per page', async () => {
        for (let i = 1;i <= 25;i++) {
            await questionCommentRepositoryStub.create(createQuestionComment({ questionId: new UniqueEntityId('question-1') }))
        }

        const { comments } = await sut.execute({ questionId: 'question-1', page: 2 })

        expect(comments).toHaveLength(5)
    })
})
