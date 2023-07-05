import { FetchQuestionCommentService } from '@/domain/forum/application/services'
import { UniqueEntityId } from '@/core/entities'
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

        const result = await sut.execute({ questionId: 'question-1', page: 2 })

        expect(result.isRight()).toBeTruthy()
        expect(result.value?.comments).toHaveLength(5)
    })
})
