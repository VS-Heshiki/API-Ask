import { DeleteCommentOnAnswerService } from '@/domain/forum/application/services'
import { UniqueEntityId } from '@/core/entities'
import { AnswerCommentRepositoryStub, createAnswerComment } from '@/tests/mock'
import { AnswerComment } from '@/domain/forum/enterprise/entities'

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
})
