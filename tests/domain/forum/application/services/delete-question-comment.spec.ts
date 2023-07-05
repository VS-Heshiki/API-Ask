import { DeleteCommentOnQuestionService } from '@/domain/forum/application/services'
import { QuestionComment } from '@/domain/forum/enterprise/entities'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { QuestionCommentRepositoryStub, createQuestionComment } from '@/tests/mock'

describe('DeleteQuestionComment Service', () => {
    let sut: DeleteCommentOnQuestionService
    let questionCommentRepositoryStub: QuestionCommentRepositoryStub
    let newQuestionComment: QuestionComment

    beforeEach(async () => {
        questionCommentRepositoryStub = new QuestionCommentRepositoryStub()
        sut = new DeleteCommentOnQuestionService(questionCommentRepositoryStub)

        newQuestionComment = createQuestionComment({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('comment-1'))
        await questionCommentRepositoryStub.create(newQuestionComment)
    })

    it('should call Service with correct values', async () => {
        const deleteSpy = vitest.spyOn(questionCommentRepositoryStub, 'delete')

        await sut.execute({
            authorId: 'author-1',
            commentId: 'comment-1'
        })

        expect(questionCommentRepositoryStub.items).toHaveLength(0)
        expect(deleteSpy).toHaveBeenCalledWith(newQuestionComment)
    })

    it('should avoid delete a comment from another user', async () => {
        const result = await sut.execute({
            authorId: 'author-2',
            commentId: 'comment-1'
        })

        expect(result.isLeft).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
