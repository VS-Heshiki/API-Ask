import { DeleteCommentOnAnswerService } from '@/domain/forum/application/services'
import { AnswerComment } from '@/domain/forum/enterprise/entities'
import { NotAllowedError } from '@/domain/forum/application/services/errors'
import { UniqueEntityId } from '@/core/entities'
import { AnswerCommentRepositoryStub, createAnswerComment } from '@/tests/mock'

describe('DeleteAnswerComment Service', () => {
    let sut: DeleteCommentOnAnswerService
    let answerCommentRepositoryStub: AnswerCommentRepositoryStub
    let newAnswerComment: AnswerComment

    beforeEach(async () => {
        answerCommentRepositoryStub = new AnswerCommentRepositoryStub()
        sut = new DeleteCommentOnAnswerService(answerCommentRepositoryStub)

        newAnswerComment = createAnswerComment({ authorId: new UniqueEntityId('author-1') }, new UniqueEntityId('comment-1'))
        await answerCommentRepositoryStub.create(newAnswerComment)
    })

    it('should call Service with correct values', async () => {
        const deleteSpy = vitest.spyOn(answerCommentRepositoryStub, 'delete')

        await sut.execute({
            authorId: 'author-1',
            commentId: 'comment-1'
        })

        expect(answerCommentRepositoryStub.items).toHaveLength(0)
        expect(deleteSpy).toHaveBeenCalledWith(newAnswerComment)
    })

    it('should avoid delete a comment from another user', async () => {
        const result = await sut.execute({
            authorId: 'author-2',
            commentId: 'comment-1'
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(NotAllowedError)
    })
})
